import { NextRequest } from "next/server";
import manifest from "@/.generated/manifest.json";
import projects from "@/.generated/projects.json";
import {
  discordPreview,
  discordHomePreview,
  type PreviewCommit,
} from "@/lib/discord-preview";
import fileCommits from "@/.generated/git-info.json";
import build from "@/.generated/build-info.json";
import { message, repository, siteUrl } from "@/lib/site";

const pages = new Map(manifest.map((page) => [page.url, page]));
const commits = fileCommits as Record<string, PreviewCommit>;

function preview(url: string) {
  if (url === "/" || url === "/fr") {
    const locale = url === "/fr" ? "fr" : "en";
    return discordHomePreview(
      {
        locale,
        description: message(locale, "homepage.description"),
      },
      projects,
      siteUrl,
      { repository, revision: build.revision },
    );
  }
  const page = pages.get(url);
  if (!page) return;
  const project = projects.find((project) => project.id === page.project)!;
  return discordPreview(page, project, siteUrl, {
    repository,
    commit: commits[page.sourcePath],
  });
}

export function GET(request: NextRequest) {
  const payload = preview(request.nextUrl.searchParams.get("url") || "");
  if (!payload)
    return Response.json(
      { error: "Documentation page not found" },
      { status: 404 },
    );
  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
