import type { SortedResult } from "fumadocs-core/search";
import type { SearchServer, QueryOptions } from "fumadocs-core/search/server";
import index from "@/.generated/search-index.json";
import { normalizeSearchText } from "./search-text";

// The complete corpus is normalized at build time. Querying this read-only
// index avoids allocating a search database inside a constrained Worker.
export const search: SearchServer & {
  GET: (request: Request) => Promise<Response>;
} = {
  async search(query: string, options: QueryOptions = {}) {
    const terms = [
      ...new Set(
        normalizeSearchText(query.slice(0, 200)).match(/[\p{L}\p{N}_-]+/gu) ||
          [],
      ),
    ].slice(0, 12);
    if (!terms.length) return [];
    const locale = options.locale === "fr" ? "fr" : "en";
    const scopes = (
      Array.isArray(options.tag) ? options.tag : [options.tag]
    ).filter((scope): scope is string => Boolean(scope));
    const global = scopes.length === 0 || scopes.includes("all");
    const limit = Math.max(1, Math.min(options.limit || 12, 30));
    const matches = index
      .filter(
        (page) =>
          page.locale === locale &&
          (global ||
            scopes.includes(page.url.split("/")[locale === "fr" ? 2 : 1])) &&
          terms.every((term) => page.text.includes(term)),
      )
      .map((page) => ({
        page,
        score: terms.reduce(
          (score, term) =>
            score +
            (page.titleText.includes(term)
              ? 20
              : page.description.includes(term)
                ? 8
                : 1),
          0,
        ),
      }))
      .sort(
        (a, b) => b.score - a.score || a.page.url!.localeCompare(b.page.url!),
      )
      .slice(0, limit);
    const results: SortedResult[] = [];
    for (const { page } of matches) {
      results.push({
        id: page.url!,
        url: page.url!,
        type: "page",
        content: page.title,
      });
      for (const heading of page.headings
        .filter((heading) => terms.every((term) => heading.text.includes(term)))
        .slice(0, 2)) {
        const url = `${page.url}#${heading.id}`;
        results.push({ id: url, url, type: "heading", content: heading.title });
      }
    }
    return results;
  },
  async export() {
    return index;
  },
  async GET(request: Request) {
    const params = new URL(request.url).searchParams;
    return Response.json(
      await search.search(params.get("query") || "", {
        locale: params.get("locale"),
        tag: params.get("tag") || undefined,
      }),
    );
  },
};
