import { docsLlms } from "@/lib/api-source";

export async function GET(request: Request) {
  const lang =
    new URL(request.url).searchParams.get("lang") === "fr" ? "fr" : "en";
  return new Response(await docsLlms.index(lang), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
