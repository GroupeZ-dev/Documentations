type PreviewPage = {
  title: string;
  description?: string;
  url: string;
  locale: string;
};

export type PreviewCommit = {
  revision: string;
  date: string;
  author: string;
  authorLogin?: string;
};

function text(value: string, limit: number) {
  // Bound Unicode before escaping so the complete payload stays below 3,000 bytes.
  const characters = Array.from(value.replace(/\s+/g, " ").trim());
  return (
    characters.slice(0, limit).join("") + (characters.length > limit ? "…" : "")
  ).replace(/([\\`*_{}\[\]()<>#~|])/g, "\\$1");
}

export function discordPreview(
  page: PreviewPage,
  project: { name: string; group: string },
  origin: string,
  metadata: { repository: string; commit?: PreviewCommit },
) {
  const fr = page.locale === "fr";
  const url = new URL(page.url, origin).href;
  const category =
    project.group === "plugins" ? "Plugin" : fr ? "Projet" : "Project";
  const commit = metadata.commit;
  const timestamp = commit ? Math.floor(Date.parse(commit.date) / 1000) : NaN;
  const repositoryUrl = `https://github.com/${metadata.repository}`;
  const updated = [];
  if (
    commit &&
    Number.isFinite(timestamp) &&
    /^[a-f0-9]{40}$/i.test(commit.revision)
  ) {
    const author = commit.authorLogin
      ? `[${text(commit.authorLogin, 39)}](${repositoryUrl}/commits?author=${encodeURIComponent(commit.authorLogin)})`
      : text(commit.author, 60);
    updated.push({
      type: 10,
      content: `-# ${fr ? "Mis à jour" : "Updated"}: **<t:${timestamp}:D>** · ${fr ? "Par" : "By"} ${author} · [${commit.revision.slice(0, 7)}](${repositoryUrl}/commit/${commit.revision})`,
    });
  }
  return {
    component: {
      type: 17,
      accent_color: null,
      components: [
        {
          type: 10,
          content: `-# <:z_aqua:1259167921356279848> **GroupeZ Docs · ${category}: __${text(project.name, 60)}__**`,
        },
        { type: 14, divider: true, spacing: 1 },
        {
          type: 9,
          components: [
            {
              type: 10,
              content: `## *${text(page.title, 120)}*${page.description ? `\n${text(page.description, 250)}` : ""}`,
            },
          ],
          accessory: {
            type: 2,
            style: 5,
            label: fr ? "🔎 Lire la documentation" : "🔎 Read documentation",
            url,
          },
        },
        { type: 14, divider: true, spacing: 1 },
        {
          type: 9,
          components: updated.length
            ? updated
            : [{ type: 10, content: "-# GroupeZ Docs" }],
          accessory: {
            type: 2,
            style: 5,
            label: fr ? "Aide sur Discord" : "Discord support",
            url: "https://discord.groupez.dev/",
            emoji: { name: "🔗" },
          },
        },
      ],
    },
  };
}

export function discordHomePreview(
  home: { locale: string; description: string },
  projects: { name: string; group: string }[],
  origin: string,
  metadata: { repository: string; revision?: string },
) {
  const fr = home.locale === "fr";
  const path = fr ? "/fr" : "/";
  const plugins = projects.filter((project) => project.group === "plugins");
  const libraries = projects.filter((project) => project.group === "projects");
  const section = (content: string, label: string, anchor: string) => ({
    type: 9,
    components: [{ type: 10, content }],
    accessory: {
      type: 2,
      style: 5,
      label,
      url: new URL(`${path}#${anchor}`, origin).href,
    },
  });
  const revision =
    metadata.revision && /^[a-f0-9]{40}$/i.test(metadata.revision)
      ? `[${metadata.revision.slice(0, 7)}](https://github.com/${metadata.repository}/commit/${metadata.revision})`
      : undefined;
  return {
    component: {
      type: 17,
      accent_color: null,
      components: [
        {
          type: 10,
          content: `-# <:z_aqua:1259167921356279848> **GroupeZ Docs · ${fr ? "Accueil" : "Home"}**`,
        },
        { type: 14, divider: true, spacing: 1 },
        section(
          `## *GroupeZ Docs*\n${text(home.description, 250)}`,
          fr ? "🔎 Explorer la documentation" : "🔎 Explore documentation",
          "catalogue",
        ),
        section(
          `**${plugins.length} plugins Minecraft**\n${fr ? "Menus, enchères, quêtes et outils pour votre serveur." : "Menus, auctions, quests and tools for your server."}`,
          "Plugins",
          "documentation",
        ),
        section(
          `**${libraries.length} ${fr ? "bibliothèques et projets" : "libraries and projects"}**\n${text(libraries.map((project) => project.name).join(" · "), 220)}`,
          fr ? "Bibliothèques et projets" : "Libraries and projects",
          "projects",
        ),
        { type: 14, divider: true, spacing: 1 },
        {
          type: 9,
          components: [
            {
              type: 10,
              content: `-# English · Français · MCP${revision ? `\n-# ${fr ? "Version déployée" : "Deployed version"} : ${revision}` : ""}`,
            },
          ],
          accessory: {
            type: 2,
            style: 5,
            label: fr ? "Aide sur Discord" : "Discord support",
            url: "https://discord.groupez.dev/",
            emoji: { name: "🔗" },
          },
        },
      ],
    },
  };
}
