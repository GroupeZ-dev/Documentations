import {
  loader,
  llms,
  type InferPageType,
  type StaticSource,
  type MetaData,
} from "fumadocs-core/source";
import files from "@/.generated/api-content.json";
import navigation from "@/.generated/navigation.json";
import type { Root } from "fumadocs-core/page-tree";
import { i18n } from "./content-source";

// APIs need text and search metadata, not the highlighted React page bodies.
type ApiPageData = (typeof files)[number]["data"] & {
  getText: () => Promise<string>;
};
const apiContent: StaticSource<{ pageData: ApiPageData; metaData: MetaData }> =
  {
    files: files.map((file) => ({
      type: "page" as const,
      path: file.path,
      data: { ...file.data, getText: async () => file.data.markdown },
    })),
  };
export const source = loader({
  baseUrl: "/",
  i18n,
  source: apiContent,
});
source.getPageTree = (locale) =>
  navigation[locale === "fr" ? "fr" : "en"] as Root;
source.getNodePage = (node, locale) => source.getPageByUrl(node.url, locale);
export const docsLlms = llms(source, {
  renderPage: async (page: InferPageType<typeof source>) =>
    `# ${page.data.title}\n\nSource: ${page.url}\nLanguage: ${page.data.fallback ? "English (translation unavailable)" : page.data.locale}\n\n${await page.data.getText()}`,
});
