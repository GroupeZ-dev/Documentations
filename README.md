# GroupeZ documentation

English and French documentation for GroupeZ plugins, libraries and projects, built with Next.js and Fumadocs. Requires **Node.js 24**.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. English URLs are unchanged; French pages use `/fr`, with an English fallback for missing translations.

## Contributing

- Guides: `plugins/<project>/docs/`.
- French translations: `i18n/fr/<project>/`.
- Navigation: `meta.json` files alongside the English guides; project metadata: `content.config.mjs`.
- Images and videos: `public/`.

Markdown and translation directories remain the source of truth. Navigation uses Fumadocs `meta.json`; tabs and callouts use native Fumadocs components. `.generated/` and `.source/` are generated; do not edit them. Git author aliases live in `git-authors.json`.

When adding a guide, include its slug in the corresponding `meta.json` `pages` list.

## Production on Plesk

1. Check out the repository with its Git history. In Plesk's **Node.js** settings, select Node.js **24**, application mode **production**, the repository as **Application Root**, and its `public/` directory as **Document Root**.
2. Set **Application Startup File** to `server.cjs`. This small Passenger entry point delegates requests to Next.js.
3. Install and build in the application directory:

   ```sh
   npm ci --include=dev
   npm run build
   ```

4. Enable/restart the Node.js application in Plesk. Replace the previous static `build/` document root with `public/`; requests must reach the Node.js application. Rebuild and restart after documentation updates.

For a regular Node.js process, use `npm start` after building (`PORT` defaults to `3000`). Keep the source, generated files, `.next/`, `public/` and installed dependencies available. No database, model key or external search service is required.

Defaults target the official site. Optional **build-time** settings are listed in [.env.example](.env.example): `SITE_URL`, `DOCS_REPOSITORY`, `DOCS_BRANCH`, and `NEXT_PUBLIC_ENABLE_ADS`. Set `SITE_URL` for previews; non-official origins are excluded from indexing. Advertising is opt-in. Full Git history enables accurate page-update metadata; archives and shallow clones fall back to history links when unavailable.

Before switching the official domain, verify the build on a staging domain (set `SITE_URL` before building), including French pages, search and `/api/mcp`. Keep the previous deployment available for rollback until the new site is verified. See [Plesk's Node.js settings](https://doc.plesk.com/en-US/obsidian/administrator-guide/website-management/hosting-nodejs-applications.76652/).

## Integrations

- `/api/mcp`: read-only Streamable HTTP tools `search`, `get_page`, `list_pages`. Setup instructions are available in the page's **Copy page** menu. The client supplies its own AI model; there is no hosted chatbot.
- `/llms.txt`, `/llms-full.txt` and page URLs ending in `.md`: Markdown for external tools. `Accept: text/markdown` is also supported.
- Discord previews are generated automatically from page metadata via `/api/discord`, discovered in the page HTML. No bot or per-page configuration is needed.

## Validation

```sh
npm run check:content
npm run typecheck
npm run test:discord
npm run build
npm run test:server
```

CI runs these checks without deployment credentials. They cover source/media preservation, every localized page, redirects, 404s, search, Markdown, Discord and MCP using the production Node.js entry point. `npm run test:smoke` can also check an existing server using `TEST_ORIGIN` (default: `http://localhost:3000`).
