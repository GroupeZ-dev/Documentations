---
title: MCP server
---

# MCP server

groupez.dev exposes a [Model Context Protocol](https://modelcontextprotocol.io) server, so AI assistants (Claude, ChatGPT, Cursor, VS Code Copilot…) can search the marketplace and read resource pages directly.

```
https://groupez.dev/mcp
```

| | |
| --- | --- |
| Transport | Streamable HTTP, `POST` only (a `GET` returns `405`) |
| Authentication | None |
| Access | Read-only |
| Server name | `GroupeZ`, version `1.0.0` |

<CalloutContainer type="info">

<CalloutTitle>Public and read-only</CalloutTitle>

<CalloutDescription>
The server answers exactly what a logged-out visitor of the website can read: published resources, unlisted resources whose id is known, their versions and the category tree. Drafts and private resources answer "not found", as an id that never existed would. No tool takes or exposes an account, and downloading a resource still requires a GroupeZ account on the website.
</CalloutDescription>

</CalloutContainer>

## Connecting a client

### Claude Code

```bash
claude mcp add --transport http groupez https://groupez.dev/mcp
```

### Claude (claude.ai and Claude Desktop)

**Settings → Connectors → Add custom connector**, then enter `https://groupez.dev/mcp` as the URL. No OAuth configuration is needed.

### ChatGPT

Custom MCP servers are added as connectors, which requires **developer mode**:

1. Open **Settings → Apps & Connectors → Advanced settings** and turn on **Developer mode**.
2. Back in **Apps & Connectors**, click **Create**.
3. Name the connector `GroupeZ`, enter `https://groupez.dev/mcp` as the MCP server URL, and choose **No authentication**.
4. In a conversation, enable the GroupeZ connector from the tools menu (**+**).

<CalloutContainer type="info">

<CalloutTitle>Plans and menus</CalloutTitle>

<CalloutDescription>
Developer mode is not available on the free plan. On Business, Enterprise and Edu workspaces, an admin may have to allow custom connectors first. OpenAI moves these settings regularly: if the menu differs, look for "Developer mode" in the settings. Since every GroupeZ tool is read-only, plans that limit custom connectors to read actions are enough.
</CalloutDescription>

</CalloutContainer>

### Cursor

In `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "groupez": {
      "url": "https://groupez.dev/mcp"
    }
  }
}
```

### VS Code

In `.vscode/mcp.json`:

```json
{
  "servers": {
    "groupez": {
      "type": "http",
      "url": "https://groupez.dev/mcp"
    }
  }
}
```

### Any other client

Any client that supports remote MCP servers over HTTP works with the URL above. Clients that only support `stdio` can go through a bridge such as [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "groupez": {
      "command": "npx",
      "args": ["mcp-remote", "https://groupez.dev/mcp"]
    }
  }
}
```

## Tools

The server offers four tools, all annotated read-only. Every answer is Markdown text and carries the public URL of the page it comes from.

### `search_resources`

Searches the catalogue. It returns the same page, in the same order, as the website's [`/resources`](https://groupez.dev/resources) listing with the same filters: 24 results per page, each with its id, price, rating, downloads, current version, author, category and URL.

| Argument | Type | Description |
| --- | --- | --- |
| `query` | string, max 80 | Free-text search, typo tolerant (`auction house`, `zmenu`). |
| `category` | string | A category slug from `list_categories`. A section includes its subcategories. An unknown slug is a validation error. |
| `price` | `free` \| `paid` | Filter by price. |
| `minecraft_version` | string, max 20 | Only resources declaring this Minecraft version, e.g. `1.21`. |
| `sort` | `recent` \| `downloads` \| `rating` \| `name` | Defaults to `recent` (latest release first). |
| `page` | integer ≥ 1 | Page number. |

Every argument is optional. With none, the tool lists the most recently updated resources. If the search engine is unreachable, the tool returns an error instead of an empty page. Retry later, or search without `query`.

### `get_resource`

Returns the full sheet of one resource: summary, author, category, current version, price, compatibility, description, FAQ and source URL. It is the same document as the page's Markdown version (`/resources/{slug}.{id}.md`).

| Argument | Type | Description |
| --- | --- | --- |
| `id` | integer ≥ 1, **required** | The resource id, as returned by `search_resources`. |

### `list_resource_versions`

Returns the release history of one resource, newest first by version number (so `1.10` comes before `1.9`), with release date, file size and changelog. Each changelog is cut at 1,500 characters.

| Argument | Type | Description |
| --- | --- | --- |
| `id` | integer ≥ 1, **required** | The resource id. |
| `limit` | integer 1–50 | How many versions to return, 10 by default. |

### `list_categories`

Returns the category tree: sections, then their subcategories, each with the slug that `search_resources` accepts and its number of published resources. It takes no arguments.

## Rate limiting

`/mcp` uses the same `api` limiter as the [public API](./api/v2/overview.md#rate-limiting): **120 requests per minute per IP**. Each tool call is one request. Past the limit, the server answers `429`.

## Example

A request to an assistant connected to the server:

> What is the most downloaded resource on GroupeZ?

The assistant calls `search_resources` with `sort: "downloads"`. The first line of the answer looks like this:

```
- **zAuctionHouse** — The best auction house plugin, mandatory for your server. (id 1, 12.00 EUR, 10,602 downloads, v4.0.1.4, by Maxlego08, General) https://groupez.dev/resources/zauctionhouse.1
```

The raw JSON-RPC call, for clients you write yourself:

```bash
curl -X POST https://groupez.dev/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_resources","arguments":{"sort":"downloads"}}}'
```
