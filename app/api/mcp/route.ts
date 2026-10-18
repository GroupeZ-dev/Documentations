import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { registerSourceTools } from "fumadocs-core/mcp";
import { z } from "zod";
import { source, docsLlms } from "@/lib/api-source";
import { search } from "@/lib/search";
import { findMcpPages, projectIds } from "@/lib/mcp-search";

const handler = createMcpHandler(() => {
  const server = new McpServer(
    { name: "GroupeZ Documentation", version: "1.1.1" },
    {
      instructions:
        "Read-only GroupeZ documentation. Answer in the language of the latest user message unless the user explicitly requests another language; re-evaluate each turn. Source language must not dictate response language. Use search (locale fr for French, en otherwise), then get_page for exact examples. Cite source URLs. Preserve commands, placeholders and YAML keys without translation. French pages may fall back to English. No API key required. Cannot run commands or change a Minecraft server.",
    },
  );
  registerSourceTools(server, source, docsLlms);
  server.registerTool(
    "search",
    {
      title: "Search GroupeZ documentation",
      description:
        "Find documentation pages. Use short keywords or a question, locale fr for French messages or en otherwise, and optionally project (such as zmenu or zessentials) to avoid mixing plugins. Read a result with get_page before proposing configuration. Answer in the user's language even when the source uses another language; preserve exact configuration syntax.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: z.object({
        query: z.string().min(1).max(200),
        locale: z
          .enum(["en", "fr"])
          .describe(
            "Documentation language: fr for French questions, en otherwise. Does not constrain the response language.",
          )
          .optional(),
        project: z
          .string()
          .refine((id) => projectIds.has(id), "Unknown project")
          .optional(),
      }),
    },
    async ({ query, locale = "en", project }) => {
      const results = await search.search(query, { locale, tag: project });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              results.length
                ? results
                : findMcpPages(query, { locale, project }).map((page) => ({
                    url: page.url,
                    content: page.title,
                    type: "page",
                  })),
            ),
          },
        ],
      };
    },
  );
  return server;
});
export async function GET(request: Request) {
  return handler.fetch(request);
}
export async function POST(request: Request) {
  return handler.fetch(request);
}
export async function DELETE(request: Request) {
  return handler.fetch(request);
}
