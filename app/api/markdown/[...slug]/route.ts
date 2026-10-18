import { markdownResponse } from "@/lib/markdown";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  return markdownResponse("/" + (await params).slug.join("/"));
}
