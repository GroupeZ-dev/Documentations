import { visit } from "unist-util-visit";

// The page header renders the title. Keep the original Markdown anchor without
// repeating its leading H1 in the body; processed Markdown remains unchanged.
export function rehypePageHeading() {
  return (tree) => {
    const first = tree.children.find(
      (node) => node.type === "element" || node.type === "mdxJsxFlowElement",
    );
    if (first?.type === "element" && first.tagName === "h1") {
      first.tagName = "span";
      first.properties = {
        id: first.properties.id,
        className: ["page-title-anchor"],
        "aria-hidden": true,
      };
      first.children = [];
    }
    visit(tree, "element", (node) => {
      if (node.tagName === "h1") node.tagName = "h2";
    });
  };
}
