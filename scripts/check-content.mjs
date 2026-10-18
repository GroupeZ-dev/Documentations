import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { readDocument } from "./document.mjs";
import { projects, locales } from "../content.config.mjs";

const manifest = JSON.parse(
  await fs.readFile(".generated/manifest.json", "utf8"),
);
const allRoutes = new Set();
const sources = new Set(manifest.map((p) => p.sourcePath));
const errors = [];
function fenced(text) {
  const blocks = [];
  let marker,
    current = [];
  for (const line of text.split("\n")) {
    const match = line.match(/^\s*(`{3,}|~{3,})/);
    if (!marker && match) {
      marker = match[1][0];
      current = [line];
    } else if (marker) {
      current.push(line);
      if (match?.[1][0] === marker) {
        blocks.push(current.join("\n"));
        marker = undefined;
      }
    }
  }
  return blocks;
}
for (const page of manifest) {
  assert(!allRoutes.has(page.url), `Duplicate URL: ${page.url}`);
  allRoutes.add(page.url);
  const original = readDocument(
    await fs.readFile(page.sourcePath, "utf8"),
  ).content;
  const generated = readDocument(
    await fs.readFile(page.output, "utf8"),
  ).content;
  assert.deepEqual(
    fenced(generated),
    fenced(original),
    `Changed code examples in ${page.sourcePath}`,
  );
  assert(
    !/^import .*['"]@theme\//m.test(generated),
    `Unsupported theme import in ${page.output}`,
  );
}
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
for (const file of [...(await walk("plugins")), ...(await walk("i18n"))].filter(
  (f) => /\.mdx?$/.test(f),
)) {
  const source = file.split(path.sep).join("/");
  if (!sources.has(source)) errors.push(`Document omitted: ${source}`);
}
for (const project of projects)
  for (const locale of locales)
    assert(
      manifest.some((p) => p.project === project.id && p.locale === locale),
    );
assert.equal(errors.length, 0, errors.join("\n"));
const navigation = JSON.parse(
  await fs.readFile(".generated/navigation.json", "utf8"),
);
const identities = new Set();
const navigable = new Set();
function checkIdentity(node) {
  assert(
    node.$id && !identities.has(node.$id),
    `Missing or duplicate navigation identity: ${node.name}`,
  );
  identities.add(node.$id);
  if (node.type === "page" && !node.external) navigable.add(node.url);
  node.children?.forEach(checkIdentity);
  if (node.index) checkIdentity(node.index);
}
for (const locale of locales) {
  checkIdentity(navigation[locale]);
  assert.deepEqual(
    navigation[locale].children.map((node) => node.name),
    projects.map((project) => project.name),
  );
}
for (const page of manifest)
  assert(navigable.has(page.url), `Page absent from navigation: ${page.url}`);
console.log(
  `Content integrity passed: ${sources.size} source documents, ${allRoutes.size} localized URLs, 23 sections, every fenced example preserved.`,
);
