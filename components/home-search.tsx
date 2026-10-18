"use client";

import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import type { Locale } from "@/lib/site";

export function HomeSearch({ locale }: { locale: Locale }) {
  const { setOpenSearch, hotKey } = useSearchContext();
  return (
    <button
      className="home-search"
      type="button"
      onClick={() => setOpenSearch(true)}
    >
      <Search size={19} aria-hidden="true" />
      <span>
        {locale === "fr"
          ? "Rechercher dans la documentation"
          : "Search the documentation"}
      </span>
      <kbd aria-hidden="true">
        {hotKey.map((key, index) => (
          <span key={index}>{key.display}</span>
        ))}
      </kbd>
    </button>
  );
}
