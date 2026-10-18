import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";

// Run against the production Node.js server or an explicitly selected deployment.
const origin = process.env.TEST_ORIGIN || "http://localhost:3000";
const manifest = JSON.parse(
  await fs.readFile(".generated/manifest.json", "utf8"),
);
async function get(path) {
  const response = await fetch(origin + path, {
    signal: AbortSignal.timeout(60000),
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}
await (await get("/")).text();
const frenchHome = await (await get("/fr")).text();
assert.match(frenchHome, /lang="fr"/);
for (const path of [
  "/",
  "/fr",
  "/zmenu/getting-started",
  "/fr/zmenu/getting-started",
]) {
  const response = await fetch(origin + path, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
    },
  });
  assert.equal(response.status, 200);
  const html = await response.text();
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1];
  assert(head, "Missing server-rendered head");
  const link = head.match(/<link[^>]*rel="discord:component-embed"[^>]*>/)?.[0];
  assert(link, "Discord discovery must be present without JavaScript");
  assert.match(head, /property="og:title"/);
  assert.match(head, /property="og:description"/);
  const endpoint = new URL(link.match(/href="([^"]+)"/)[1]);
  assert.equal(endpoint.searchParams.get("url"), path);
  const json = await (await get(endpoint.pathname + endpoint.search)).text();
  assert(Buffer.byteLength(json, "utf8") <= 3000);
  const payload = JSON.parse(json);
  assert.equal(payload.component.type, 17);
  assert(
    payload.component.components[0].content.includes(
      "<:z_aqua:1259167921356279848>",
    ),
  );
  const section = payload.component.components.find((c) => c.type === 9);
  assert.equal(section.accessory.type, 2);
  const home = path === "/" || path === "/fr";
  assert.equal(
    section.accessory.url,
    endpoint.origin + path + (home ? "#catalogue" : ""),
  );
  if (home) {
    const sections = payload.component.components.filter(
      (component) => component.type === 9,
    );
    assert(
      sections.some(
        (section) =>
          section.accessory.url === endpoint.origin + path + "#documentation",
      ),
    );
    assert(
      sections.some(
        (section) =>
          section.accessory.url === endpoint.origin + path + "#projects",
      ),
    );
  }
  const support = payload.component.components.at(-1);
  assert.equal(support.type, 9);
  assert.equal(support.accessory.url, "https://discord.groupez.dev/");
  assert.equal(
    new URL(section.accessory.url).origin,
    endpoint.origin,
    "Discord buttons must stay on the deployment origin",
  );
}
assert.equal(
  (await fetch(origin + "/api/discord?url=https://example.invalid/")).status,
  404,
);
assert.match(
  await (await get("/fr/groupez-dev/api/v2/overview")).text(),
  /traduction française/,
);
const pages = [...manifest];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (pages.length) {
      const page = pages.pop();
      const html = await (await get(page.url)).text();
      assert.equal(
        (html.match(/<h1(?:\s|>)/g) || []).length,
        1,
        `Repeated/missing page title: ${page.url}`,
      );
    }
  }),
);
console.log(`${manifest.length} localized pages return HTTP 200.`);
for (const locale of ["en", "fr"]) {
  const results = await (
    await get(`/api/search?query=installation&locale=${locale}`)
  ).json();
  assert(results.length > 0, `Empty ${locale} search`);
  assert(
    results.every((result) =>
      locale === "fr"
        ? result.url.startsWith("/fr/")
        : !result.url.startsWith("/fr/"),
    ),
    `Wrong search locale: ${locale}`,
  );
}
const accented = await (
  await get("/api/search?query=r%C3%A9compenses&locale=fr")
).json();
for (const locale of ["en", "fr"]) {
  const local = await (
    await get(`/api/search?query=item&locale=${locale}&tag=zmenu`)
  ).json();
  const prefix = locale === "fr" ? "/fr/zmenu/" : "/zmenu/";
  assert(
    local.length > 0 && local.every((result) => result.url.startsWith(prefix)),
    `Search escaped the current project in ${locale}`,
  );
  const global = await (
    await get(`/api/search?query=item&locale=${locale}&tag=all`)
  ).json();
  assert(
    global.some((result) => !result.url.startsWith(prefix)),
    "Global search did not broaden results",
  );
}
const plain = await (
  await get("/api/search?query=recompenses&locale=fr")
).json();
assert(accented.length > 0, "French search failed on accented words");
assert.deepEqual(accented, plain, "Search must ignore accents");
assert(
  (
    await (
      await get("/api/search?query=custom%20model%20data&locale=en")
    ).json()
  ).length > 0,
  "Multiple-word configuration search failed",
);
const markdown = await (await get("/zmenu/installation.md")).text();
assert.match(markdown, /zMenu/);
assert(!markdown.includes("<!DOCTYPE html>"), "Markdown route returned HTML");
await (await get("/llms.txt")).text();
const negotiated = await fetch(origin + "/zmenu/installation", {
  headers: { Accept: "text/markdown" },
});
assert.match(negotiated.headers.get("content-type"), /text\/markdown/);
assert.match(await negotiated.text(), /zMenu/);
assert.match(await (await get("/llms.txt?lang=fr")).text(), /\/fr\/zmenu\//);
const missing = await fetch(origin + "/zmenu/this-page-does-not-exist");
assert.equal(missing.status, 404);
const canonical = await fetch(origin + "/en/zmenu/installation", {
  redirect: "manual",
});
assert.equal(canonical.status, 308);
for (const locale of ["", "/fr"]) {
  const rootRedirect = await fetch(origin + locale + "/zmenu", {
    redirect: "manual",
  });
  assert.equal(rootRedirect.status, 308);
  const root = await fetch(origin + locale + "/zmenu");
  assert.equal(root.status, 200);
  assert.match(new URL(root.url).pathname, /\/zmenu\/getting-started$/);
  assert.equal(
    (await fetch(origin + locale + "/nonexistent-documentation-page")).status,
    404,
  );
}
const video = await fs.readFile("public/img/bedrock.mp4");
for (const [start, end] of [
  [100, 199],
  [4194290, 4194330],
  [video.length - 20, video.length - 1],
]) {
  const response = await fetch(origin + "/img/bedrock.mp4", {
    headers: { Range: `bytes=${start}-${end}` },
  });
  assert.equal(response.status, 206);
  assert.deepEqual(
    Buffer.from(await response.arrayBuffer()),
    video.subarray(start, end + 1),
  );
}
const fullVideo = await (await get("/img/bedrock.mp4")).arrayBuffer();
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(
  hash(Buffer.from(fullVideo)),
  hash(video),
  "Published video bytes changed",
);
console.log("Original video bytes and seeking passed.");

let session;
let protocol;
let id = 0;
async function rpc(method, params) {
  const response = await fetch(origin + "/api/mcp", {
    method: "POST",
    signal: AbortSignal.timeout(60000),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...(session ? { "Mcp-Session-Id": session } : {}),
      ...(protocol ? { "MCP-Protocol-Version": protocol } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
  });
  assert.equal(response.status, 200, `MCP ${method}: ${response.status}`);
  session = response.headers.get("mcp-session-id") || session;
  const body = await response.text();
  const json = response.headers
    .get("content-type")
    ?.includes("text/event-stream")
    ? JSON.parse(
        body
          .split("\n")
          .find((line) => line.startsWith("data: "))
          .slice(6),
      )
    : JSON.parse(body);
  assert(!json.error, JSON.stringify(json.error));
  return json.result;
}
protocol = (
  await rpc("initialize", {
    protocolVersion: "2025-03-26",
    clientInfo: { name: "groupez-smoke-test", version: "1.0.0" },
    capabilities: {},
  })
).protocolVersion;
const list = await rpc("tools/list", {});
assert.deepEqual(list.tools.map((t) => t.name).sort(), [
  "get_page",
  "list_pages",
  "search",
]);
const index = await rpc("tools/call", { name: "list_pages", arguments: {} });
assert(!index.isError);
assert(
  index.content.some((block) => block.text?.includes("/fr/zmenu/installation")),
);
for (const url of ["/zmenu/installation", "/fr/zmenu/installation"]) {
  const page = await rpc("tools/call", {
    name: "get_page",
    arguments: { url },
  });
  assert(!page.isError, `MCP failed to read ${url}`);
  assert(page.content.some((block) => block.text?.includes("zMenu")));
}
const search = await rpc("tools/call", {
  name: "search",
  arguments: { query: "inventory", locale: "en" },
});
assert(!search.isError);
assert(search.content.some((block) => block.text?.includes("/zmenu/")));
for (const locale of ["en", "fr"]) {
  const scoped = await rpc("tools/call", {
    name: "search",
    arguments: {
      query:
        locale === "fr"
          ? "Comment créer un inventaire avec des boutons ?"
          : "How do I create an inventory with buttons?",
      locale,
      project: "zmenu",
    },
  });
  assert(!scoped.isError);
  const pages = JSON.parse(
    scoped.content.find((block) => block.type === "text").text,
  );
  assert(pages.length > 0, "Natural language MCP search found no pages");
  assert(
    pages.every((page) =>
      page.url.startsWith(locale === "fr" ? "/fr/zmenu/" : "/zmenu/"),
    ),
    "MCP search mixed documentation scopes",
  );
}
console.log(
  "Search EN/FR, Markdown, locale routing and MCP initialize/list/read/scoped search passed.",
);
