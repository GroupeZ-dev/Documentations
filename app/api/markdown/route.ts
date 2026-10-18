import { markdownResponse } from "@/lib/markdown";

export async function GET(request: Request) {
  return markdownResponse(new URL(request.url).searchParams.get("url"));
}
