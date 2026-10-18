import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

export type Locale = "en" | "fr";
export const isLocale = (value: string): value is Locale =>
  value === "en" || value === "fr";
export const localize = (url: string, locale: Locale) =>
  locale === "fr" ? "/fr" + (url === "/" ? "" : url) : url;
export const siteUrl = (
  process.env.SITE_URL || "https://docs.groupez.dev"
).replace(/\/$/, "");
export const official = siteUrl === "https://docs.groupez.dev";
export const repository =
  process.env.DOCS_REPOSITORY || "GroupeZ-dev/Documentations";
export const branch = process.env.DOCS_BRANCH || "develop";
export function message(locale: Locale, key: string, fallback?: string) {
  if (locale === "fr") {
    const translation = (fr as Record<string, string>)[key];
    if (translation) return translation;
  }
  return (en as Record<string, string>)[key] || fallback || key;
}
