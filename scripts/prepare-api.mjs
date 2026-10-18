import fs from "node:fs/promises";
import { loader } from "fumadocs-core/source";
import { i18n } from "../lib/content-source.ts";
import { register } from "fumadocs-mdx/node";
import { normalizeSearchText } from "../lib/search-text.ts";

// Compile with the same Fumadocs pipeline as the pages, but publish only the
// portable text/search data to the APIs. Rendered JSX belongs in the page bundle.
register();
const { docs } = await import("../.source/server.ts");
const source = docs.toFumadocsSource();
const pages = loader({ baseUrl: "/", source, i18n });
await fs.writeFile(
  ".generated/navigation.json",
  JSON.stringify(
    Object.fromEntries(
      i18n.languages.map((locale) => [locale, pages.getPageTree(locale)]),
    ),
  ),
);
const files = [];
for (const file of source.files) {
  if (file.type !== "page") continue;
  const { title, description, structuredData, locale, fallback } = file.data;
  files.push({
    type: "page",
    path: file.path,
    data: {
      title,
      description,
      structuredData,
      locale,
      fallback,
      markdown: await file.data.getText("processed"),
    },
  });
}
await fs.writeFile(".generated/api-content.json", JSON.stringify(files));
const manifest = JSON.parse(
  await fs.readFile(".generated/manifest.json", "utf8"),
);
const routes = new Map(
  manifest.map((page) => [
    page.output.replace(".generated/content/", ""),
    page.url,
  ]),
);
const index = files.map(({ path, data }) => ({
  url: routes.get(path),
  locale: data.locale,
  title: data.title,
  titleText: normalizeSearchText(data.title),
  description: normalizeSearchText(data.description || ""),
  text: normalizeSearchText(
    [
      data.title,
      data.description || "",
      ...data.structuredData.headings.map((heading) => heading.content),
      ...data.structuredData.contents.map((part) => part.content),
    ].join(" "),
  ),
  headings: data.structuredData.headings.map((heading) => ({
    id: heading.id,
    title: heading.content,
    text: normalizeSearchText(heading.content),
  })),
}));
if (index.some((page) => !page.url)) throw new Error("Missing search page URL");
await fs.writeFile(".generated/search-index.json", JSON.stringify(index));
console.log(`Prepared portable API content for ${files.length} pages.`);
