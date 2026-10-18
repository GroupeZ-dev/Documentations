import path from "node:path";
import { visit } from "unist-util-visit";

// Resolve relative documentation links within the localized page collection.
export function remarkDocumentationLinks() {
  return (tree, file) => {
    const relative = String(file.path)
      .replaceAll("\\", "/")
      .split("/.generated/content/")[1];
    if (!relative) return;
    const match = relative.match(/^(.*)\.(en|fr)\.mdx?$/);
    if (!match) return;
    const [, slug, locale] = match;
    const prefix = locale === "fr" ? "/fr" : "";
    const base = "/" + slug;
    visit(
      tree,
      (node) => node.type === "link" || node.type === "definition",
      (node) => {
        let url = node.url;
        if (url.startsWith("https://docs.groupez.dev/"))
          url = url.slice("https://docs.groupez.dev".length);
        if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(url)) return;
        if (
          url.startsWith("/img/") ||
          /\.(?:png|jpe?g|gif|svg|webp|mp4|zip|jar)(?:[?#]|$)/i.test(url)
        )
          return;
        const separator = url.search(/[?#]/);
        const target = separator === -1 ? url : url.slice(0, separator);
        const suffix = separator === -1 ? "" : url.slice(separator);
        let resolved = target.startsWith("/")
          ? target
          : path.posix.resolve(path.posix.dirname(base), target);
        resolved =
          resolved
            .replace(/\.mdx?$/, "")
            .replace(/\/index$/, "")
            .replace(/\/$/, "") || "/";
        if (prefix && !resolved.startsWith("/fr/") && resolved !== "/fr")
          resolved = prefix + (resolved === "/" ? "" : resolved);
        node.url = resolved + suffix;
      },
    );
    visit(
      tree,
      (node) =>
        node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement",
      (node) => {
        for (const attribute of node.attributes || [])
          if (attribute.name === "class") attribute.name = "className";
      },
    );
  };
}
