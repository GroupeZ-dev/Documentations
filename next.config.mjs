import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const siteUrl = (process.env.SITE_URL || "https://docs.groupez.dev").replace(
  /\/$/,
  "",
);
export default withMDX({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: { unoptimized: true },
  poweredByHeader: false,
  // Keep pre-rendered pages and API responses on the same public origin.
  env: {
    SITE_URL: siteUrl,
    ...(process.env.DOCS_REPOSITORY
      ? { DOCS_REPOSITORY: process.env.DOCS_REPOSITORY }
      : {}),
  },
  async redirects() {
    return [{ source: "/en/:path*", destination: "/:path*", permanent: true }];
  },
  async rewrites() {
    const docs =
      "/:path((?!api(?:/|$)|_next(?:/|$)|img(?:/|$)|llms(?:-full)?\\.txt$|sitemap\\.xml$|robots\\.txt$|favicon\\.ico$).*)";
    return {
      beforeFiles: [
        { source: "/:path*.md", destination: "/api/markdown/:path*" },
        {
          source: docs,
          has: [
            {
              type: "header",
              key: "accept",
              value: "text/markdown(?:[;,].*)?",
            },
          ],
          destination: "/api/markdown/:path*",
        },
        { source: "/", destination: "/en" },
        {
          source:
            "/:path((?!fr(?:/|$)|en(?:/|$)|api(?:/|$)|_next(?:/|$)|img(?:/|$)|llms(?:-full)?\\.txt$|sitemap\\.xml$|robots\\.txt$|favicon\\.ico$).*)",
          destination: "/en/:path*",
        },
      ],
    };
  },
  // A preview must not compete with the official documentation in search engines.
  async headers() {
    return siteUrl === "https://docs.groupez.dev"
      ? []
      : [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ];
  },
});
