import index from "../.generated/search-index.json";
import manifest from "../.generated/manifest.json";
import { normalizeSearchText } from "./search-text";

export const projectIds = new Set(
  manifest.map((page) => page.project).filter(Boolean),
);
const stopWords = new Set(
  "a an and are as at be by can do does for from how i in is it me my of on or that the this to use what when where which with you your about help please would could want configure configuration comment avec dans de des du en et est faire il je la le les ma me mes mon ne ou par pas peux plugin plugins pour que quel quelle qui se sur un une utiliser vous votre aide configurer configuration peux tu moi expliquer expliquerais merci anglais francais".split(
    " ",
  ),
);
const aliases: Record<string, string> = {
  inventaire: "inventory",
  inventaires: "inventories",
  bouton: "button",
  boutons: "buttons",
  commande: "command",
  commandes: "commands",
  permissions: "permission",
  objets: "items",
  objet: "item",
  installer: "installation",
};

// Keyword fallback for MCP clients asking a question rather than short keywords.
// Reading complete examples remains the responsibility of the get_page tool.
export function findMcpPages(
  query: string,
  options: { locale: "en" | "fr"; project?: string },
) {
  const terms = [
    ...new Set(
      (normalizeSearchText(query).match(/[\p{L}\p{N}_-]+/gu) || []).filter(
        (term) => term.length > 1 && !stopWords.has(term),
      ),
    ),
  ].slice(0, 16);
  return index
    .filter(
      (page) =>
        page.locale === options.locale &&
        (!options.project ||
          page.url.split("/")[options.locale === "fr" ? 2 : 1] ===
            options.project),
    )
    .map((page) => ({
      page,
      score: terms.reduce(
        (score, term) =>
          score +
          Math.max(
            ...[term, aliases[term]]
              .filter(Boolean)
              .map((word) =>
                page.titleText.includes(word)
                  ? 8
                  : page.description.includes(word)
                    ? 4
                    : page.text.includes(word)
                      ? 1
                      : 0,
              ),
          ),
        0,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.page.url.localeCompare(b.page.url))
    .slice(0, 5)
    .map(({ page }) => ({ title: page.title, url: page.url }));
}
