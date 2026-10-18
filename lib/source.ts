import { docs } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import manifest from "@/.generated/manifest.json";
import projects from "@/.generated/projects.json";
import { i18n } from "./content-source";
export { i18n } from "./content-source";
export const source = loader({
  baseUrl: "/",
  i18n,
  source: docs.toFumadocsSource(),
});
export const getTree = (locale: "en" | "fr") => source.getPageTree(locale);
source.getNodePage = (node, locale) => source.getPageByUrl(node.url, locale);
export { manifest, projects };
