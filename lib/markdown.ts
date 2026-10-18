import { docsLlms, source } from "./api-source";

export async function markdownResponse(url: string | null) {
  if (!url?.startsWith("/") || url.startsWith("//"))
    return new Response("A page pathname is required.", { status: 400 });
  const page = source.getPageByUrl(url);
  if (!page) return new Response("Page not found.", { status: 404 });
  return new Response(await docsLlms.page(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
