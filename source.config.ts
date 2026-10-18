import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
// @ts-expect-error JavaScript remark plugin shared with migration validation.
import { remarkDocumentationLinks } from "./lib/remark-links.mjs";
// @ts-expect-error JavaScript rehype plugin shared with presentation checks.
import { rehypePageHeading } from "./lib/rehype-page-heading.mjs";

export const docs = defineDocs({
  dir: ".generated/content",
  docs: {
    schema: frontmatterSchema.extend({
      sourcePath: z.string(),
      locale: z.enum(["en", "fr"]),
      fallback: z.boolean().default(false),
      project: z.string().optional(),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkDocumentationLinks],
    rehypePlugins: [rehypePageHeading],
    // Remote images and videos retain their original URLs; no build-time fetches.
    remarkImageOptions: false,
    // Preserve existing fence labels, including typos, without failing the site build.
    rehypeCodeOptions: {
      themes: { light: "github-light", dark: "github-dark" },
      fallbackLanguage: "text",
    },
  },
});
