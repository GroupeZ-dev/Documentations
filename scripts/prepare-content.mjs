import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { readDocument, writeDocument } from "./document.mjs";
import { projects, locales } from "../content.config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const generated = path.join(root, ".generated");
const posix = (p) => p.split(path.sep).join("/");
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  )
    .flat()
    .sort();
}
async function write(relative, content) {
  const dest = path.join(root, relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  // Keep timestamps stable for Next.js incremental development.
  if ((await fs.readFile(dest, "utf8").catch(() => null)) !== content)
    await fs.writeFile(dest, content);
}

const manifest = [];
const placeholderSources = new Set();
const expected = new Set();
for (const locale of locales) {
  for (const project of projects) {
    const docsRoot = path.join(root, "plugins", project.directory, "docs");
    const originals = (await walk(docsRoot)).filter((f) => /\.mdx?$/.test(f));
    for (const englishFile of originals) {
      const relative = posix(path.relative(docsRoot, englishFile));
      const slug = relative.replace(/\.mdx?$/, "");
      const translationRoot = path.join(root, "i18n", locale, project.id);
      const translated = [
        path.join(translationRoot, relative),
        path.join(translationRoot, `${slug}.md`),
        path.join(translationRoot, `${slug}.mdx`),
      ];
      let selected = englishFile;
      if (locale !== "en")
        for (const candidate of translated) {
          if (
            await fs
              .stat(candidate)
              .then((s) => s.isFile())
              .catch(() => false)
          ) {
            selected = candidate;
            break;
          }
        }
      const raw = await fs.readFile(selected, "utf8");
      const { data, content } = readDocument(raw);
      const url = `${locale === "en" ? "" : `/${locale}`}/${project.id}/${slug}`
        .replace(/\/index$/, "")
        .replace(/\/$/, "");
      const sourcePath = posix(path.relative(root, selected));
      if (
        /^# [^\n]+\s+(?:Welcome to the [^\n]+ documentation\.|Bienvenue [^\n]+)\s+## TODO\s+(?:- \[[ x]\] [^\n]+\s*)+$/.test(
          content.trim(),
        )
      )
        placeholderSources.add(sourcePath);
      const title =
        data.title ||
        content.match(/^#\s+(.+)$/m)?.[1] ||
        slug.split("/").at(-1);
      const fallback = locale !== "en" && selected === englishFile;
      const output = `.generated/content/${project.id}/${slug}.${locale}.mdx`;
      expected.add(output);
      const metadata = {
        ...data,
        title,
        sourcePath,
        fallback,
        locale,
        project: project.id,
      };
      await write(output, writeDocument(content, metadata));
      const entry = {
        project: project.id,
        locale,
        slug,
        url,
        title,
        sourcePath,
        fallback,
        output,
        description:
          typeof data.description === "string" ? data.description : undefined,
      };
      manifest.push(entry);
    }
    for (const metaFile of (await walk(docsRoot)).filter(
      (file) => path.basename(file) === "meta.json",
    )) {
      const relative = posix(path.relative(docsRoot, metaFile));
      const output = `.generated/content/${project.id}/${relative}`;
      const data = JSON.parse(await fs.readFile(metaFile, "utf8"));
      // Metadata links use public URLs; localize them with the page collection.
      if (locale !== "en") {
        const localized = (value) =>
          value.replace(/\]\(\/(?!fr(?:\/|\)))/g, `](/${locale}/`);
        data.pages = data.pages?.map(localized);
        if (data.pagesIndex) data.pagesIndex = localized(data.pagesIndex);
      }
      expected.add(output);
      // Fumadocs shares unqualified metadata across locales; write locale variants.
      const localizedOutput = output.replace(/\.json$/, `.${locale}.json`);
      expected.delete(output);
      expected.add(localizedOutput);
      await write(localizedOutput, JSON.stringify(data, null, 2) + "\n");
    }
  }
}
const rootMeta = ".generated/content/meta.json";
expected.add(rootMeta);
await write(
  rootMeta,
  JSON.stringify(
    { title: "GroupeZ", pages: projects.map((project) => project.id) },
    null,
    2,
  ) + "\n",
);

// Remove stale generated documents only; never touch canonical Markdown or user files.
const contentRoot = path.join(generated, "content");
for (const file of await walk(contentRoot))
  if (!expected.has(posix(path.relative(root, file)))) await fs.unlink(file);
await write(
  ".generated/manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
await write(
  ".generated/projects.json",
  JSON.stringify(
    projects.map((project) => ({
      ...project,
      incomplete: manifest
        .filter((page) => page.project === project.id)
        .every((page) => placeholderSources.has(page.sourcePath)),
    })),
    null,
    2,
  ) + "\n",
);
let revision = process.env.GITHUB_SHA || "";
let commit = { date: "", subject: "", author: "" };
const githubAuthors = JSON.parse(
  await fs.readFile(path.join(root, "git-authors.json"), "utf8"),
);
const fileCommits = {};
const sourceFiles = new Set(manifest.map((page) => page.sourcePath));
try {
  revision ||= execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const git = (args) =>
    execFileSync("git", ["-c", "core.quotepath=false", ...args], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    }).trim();
  const parseCommit = (line) => {
    const [revision, subject, author, date] = line.split("\x1f");
    const authorLogin = githubAuthors[author];
    return {
      revision,
      subject,
      author: authorLogin || author,
      authorLogin,
      date,
    };
  };
  const format = "%H%x1f%s%x1f%an%x1f%aI";
  commit = parseCommit(git(["show", "-s", `--format=${format}`, revision]));
  // A shallow boundary is a snapshot, not proof that every file changed in that commit.
  const shallow = git(["rev-parse", "--is-shallow-repository"]) === "true";
  if (shallow) {
    console.warn(
      "Git history is incomplete; unavailable page revisions will link to GitHub history. Use a full clone for last-updated metadata.",
    );
  }
  const boundaries = shallow
    ? new Set(git(["rev-list", "--max-parents=0", revision]).split("\n"))
    : new Set();
  const history = git([
    "log",
    `--format=%x1e${format}`,
    "--name-only",
    "--no-renames",
    revision,
    "--",
    "plugins",
    "i18n",
  ]);
  for (const record of history.split("\x1e").filter(Boolean)) {
    const [line, ...files] = record.trim().split("\n");
    const info = parseCommit(line);
    if (boundaries.has(info.revision)) continue;
    for (const file of files)
      if (sourceFiles.has(file)) fileCommits[file] ||= info;
  }
} catch {
  /* Source archives can be built without Git metadata. */
}
await write(
  ".generated/build-info.json",
  JSON.stringify({ ...commit, revision }) + "\n",
);
await write(".generated/git-info.json", JSON.stringify(fileCommits) + "\n");
console.log(
  `Prepared ${manifest.length} localized pages from ${new Set(manifest.map((p) => p.sourcePath)).size} canonical documents across ${projects.length} sections.`,
);
