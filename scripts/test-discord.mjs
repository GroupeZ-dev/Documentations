import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { discordPreview, discordHomePreview } from "../lib/discord-preview.ts";
import { rehypePageHeading } from "../lib/rehype-page-heading.mjs";

const pages = JSON.parse(await fs.readFile(".generated/manifest.json", "utf8"));
const projects = JSON.parse(
  await fs.readFile(".generated/projects.json", "utf8"),
);
const origin = "https://docs.groupez.dev";
const repository = "GroupeZ-dev/Documentations";
const commits = JSON.parse(
  await fs.readFile(".generated/git-info.json", "utf8"),
);
function validatePayload(payload) {
  assert(Buffer.byteLength(JSON.stringify(payload), "utf8") <= 3000);
  assert.equal(payload.component.type, 17);
  const components = [payload.component];
  for (const component of components) {
    assert([1, 2, 9, 10, 14, 17].includes(component.type));
    components.push(...(component.components || []));
    if (component.accessory) components.push(component.accessory);
    if (component.type === 2) {
      assert.equal(component.style, 5);
      assert(component.label.length <= 80);
      assert(component.url.length <= 2048);
      assert.equal(new URL(component.url).protocol, "https:");
      assert.deepEqual(Object.keys(component).sort(), [
        ...(component.emoji ? ["emoji"] : []),
        "label",
        "style",
        "type",
        "url",
      ]);
    }
  }
  assert(components.length <= 40);
  const support = payload.component.components.at(-1);
  assert.equal(support.type, 9);
  assert(support.components.length >= 1);
  assert.equal(support.accessory.type, 2);
  assert.equal(support.accessory.url, "https://discord.groupez.dev/");
  assert.equal(payload.component.accent_color, null);
  assert(
    payload.component.components[0].content.includes(
      "<:z_aqua:1259167921356279848>",
    ),
  );
  return components;
}
function validate(page, project) {
  const commit = commits[page.sourcePath];
  const payload = discordPreview(page, project, origin, { repository, commit });
  const components = validatePayload(payload);
  assert(
    payload.component.components[0].content.includes(
      project.group === "plugins"
        ? "Plugin:"
        : page.locale === "fr"
          ? "Projet:"
          : "Project:",
    ),
  );
  const texts = components.filter((c) => c.type === 10).map((c) => c.content);
  if (commit) {
    const footer = texts.find((content) => content.includes("**<t:"));
    assert(
      footer.includes(
        `**<t:${Math.floor(Date.parse(commit.date) / 1000)}:D>**`,
      ),
    );
    assert(
      footer.includes(
        `https://github.com/${repository}/commit/${commit.revision}`,
      ),
    );
    if (commit.authorLogin)
      assert(
        footer.includes(
          `/commits?author=${encodeURIComponent(commit.authorLogin)}`,
        ),
      );
  } else {
    assert(!texts.some((content) => content.includes("**<t:")));
  }
  assert.equal(
    payload.component.components.find((c) => c.type === 9).accessory.url,
    new URL(page.url, origin).href,
  );
}
for (const page of pages)
  validate(
    page,
    projects.find((project) => project.id === page.project),
  );
validate(
  {
    title: "🤖*[test]</script>".repeat(500),
    description: "é🤖\\<>\n".repeat(1000),
    locale: "fr",
    url: "/fr/zmenu/getting-started",
    sourcePath: pages[0].sourcePath,
  },
  { name: "Projet test", group: "projects" },
);
const samplePage = {
  title: "zMenu+",
  description: "Premium addon",
  locale: "en",
  url: "/zmenu/zmenu-plus",
};
const sampleCommit = {
  revision: "ee932b2019eab6d18bdf577b5e39dca5a2ec8b37",
  date: "2026-01-26T12:00:00Z",
  author: "Maxlego08",
  authorLogin: "Maxlego08",
};
const sample = discordPreview(samplePage, projects[0], origin, {
  repository: "GroupeZ-dev/Documentations",
  commit: sampleCommit,
});
assert(
  sample.component.components[4].components[0].content.includes(
    "[Maxlego08](https://github.com/GroupeZ-dev/Documentations/commits?author=Maxlego08)",
  ),
);
for (const commit of [undefined, { ...sampleCommit, date: "invalid" }]) {
  assert(
    !JSON.stringify(
      discordPreview(samplePage, projects[0], origin, {
        repository,
        commit,
      }),
    ).includes("<t:"),
  );
}
for (const locale of ["en", "fr"]) {
  for (const description of [
    "Guides, configuration and APIs.",
    "é🤖\\<>*_\n".repeat(500),
  ]) {
    const payload = discordHomePreview(
      { locale, description },
      projects,
      origin,
      {
        repository,
        revision: sampleCommit.revision,
      },
    );
    const components = validatePayload(payload);
    const home = locale === "fr" ? "/fr" : "/";
    const links = components
      .filter((component) => component.type === 2)
      .map((component) => component.url);
    for (const anchor of ["catalogue", "documentation", "projects"])
      assert(links.includes(new URL(`${home}#${anchor}`, origin).href));
    const content = components
      .filter((component) => component.type === 10)
      .map((component) => component.content)
      .join("\n");
    assert(
      content.includes(
        `**${projects.filter((project) => project.group === "plugins").length} plugins Minecraft**`,
      ),
    );
    assert(
      content.includes(
        `https://github.com/${repository}/commit/${sampleCommit.revision}`,
      ),
    );
    assert(
      content.includes(
        locale === "fr" ? "bibliothèques et projets" : "libraries and projects",
      ),
    );
    assert(!content.includes("Plugin:"));
  }
}
const tree = {
  children: [
    {
      type: "element",
      tagName: "h1",
      properties: { id: "existing-anchor" },
      children: [{ type: "text", value: "Title" }],
    },
    {
      type: "element",
      tagName: "h2",
      properties: { id: "section" },
      children: [{ type: "text", value: "Section" }],
    },
    {
      type: "element",
      tagName: "h1",
      properties: { id: "legacy-section" },
      children: [{ type: "text", value: "Legacy section" }],
    },
  ],
};
rehypePageHeading()(tree);
assert.equal(tree.children[0].tagName, "span");
assert.equal(tree.children[0].properties.id, "existing-anchor");
assert.equal(tree.children[1].tagName, "h2");
assert.equal(tree.children[2].tagName, "h2");
assert.equal(tree.children[2].properties.id, "legacy-section");
console.log(
  `Discord component payloads validated for ${pages.length} pages, Unicode byte limits and existing heading anchors.`,
);
