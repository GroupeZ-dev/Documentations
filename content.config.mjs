// Canonical Markdown remains in plugins/ and i18n/. Route names are public API.
export const projects = [
  ["zmenu", "zMenu"],
  ["zauctionhouse", "zAuctionHouse"],
  ["zantiautoclick", "zAntiAutoClick", "zantiAutoClick"],
  ["zcookiecliker", "zCookieCliker"],
  ["zcrate", "zCrate"],
  ["zdrawer", "zDrawer"],
  ["zessentials", "zEssentials"],
  ["zhead", "zHead"],
  ["zitems", "zItems"],
  ["zitemstacker", "zItemStacker"],
  ["zjobs", "zJobs"],
  ["zkoth", "zKoth"],
  ["zquests", "zQuests"],
  ["zshop", "zShop"],
  ["zspawner", "zSpawner"],
  ["ztextgenerator", "zTextGenerator"],
  ["zvault", "zVault"],
  ["zvoteparty", "zVoteParty"],
  ["superiorskyblock-zmenu", "SuperiorSkyBlock-zMenu"],
  ["currenciesapi", "CurrenciesAPI"],
  ["sarah", "Sarah"],
  ["groupez-dev", "groupez.dev"],
  ["serveur-minecraft-vote", "serveur-minecraft-vote.fr"],
].map(([id, name, directory = id]) => ({
  id,
  name,
  directory,
  group: [
    "currenciesapi",
    "sarah",
    "groupez-dev",
    "serveur-minecraft-vote",
  ].includes(id)
    ? "projects"
    : "plugins",
}));

export const locales = ["en", "fr"];
