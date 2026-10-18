// Fumadocs 16 uses source messages with context notes as translation keys.
const groups: Record<string, Record<string, string>> = {
  "search trigger": {
    Search: "Rechercher",
    "Open Search": "Ouvrir la recherche",
  },
  "search dialog": {
    Search: "Rechercher",
    "Close Search": "Fermer la recherche",
    "No results found": "Aucun résultat",
    "Search failed": "La recherche a échoué",
    "Search failed, showing results for {query}":
      "La recherche a échoué, résultats pour {query}",
  },
  "language switcher": { "Choose a language": "Choisir une langue" },
  "theme switcher": {
    Light: "Clair",
    Dark: "Sombre",
    System: "Système",
    "Toggle Theme": "Changer de thème",
  },
  "table of contents": {
    "On this page": "Sur cette page",
    "No Headings": "Aucun titre",
  },
  "inline table of contents": { "Table of Contents": "Sommaire" },
  pagination: { "Previous Page": "Précédent", "Next Page": "Suivant" },
  sidebar: {
    "Close Sidebar": "Fermer le menu",
    "Open Sidebar": "Ouvrir le menu",
    "Collapse Sidebar": "Réduire le menu",
  },
  "mobile menu": { "Toggle Menu": "Ouvrir ou fermer le menu" },
  "code block": {
    "Copied Text": "Texte copié",
    "Copy Text": "Copier le texte",
  },
  "heading anchor": {
    "Copied Anchor Link": "Lien copié",
    "Copy Anchor Link": "Copier le lien vers ce titre",
  },
  "edit page": { "Edit on GitHub": "Modifier sur GitHub" },
  "page footer": { "Last updated on": "Dernière modification" },
};
export const fumadocsFrench = Object.fromEntries(
  Object.entries(groups).flatMap(([note, entries]) =>
    Object.entries(entries).flatMap(([text, translation]) => [
      [`${text}(${note})`, translation],
      [`${text}(${note})(aria-label)`, translation],
    ]),
  ),
);
