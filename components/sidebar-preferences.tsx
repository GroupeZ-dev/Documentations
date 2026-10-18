"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { LanguageSelect } from "fumadocs-ui/layouts/shared/slots/language-select";
import type { Locale } from "@/lib/site";

export function SidebarPreferences({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const fr = locale === "fr";
  return (
    <div
      className="sidebar-preferences"
      role="group"
      aria-label={fr ? "Préférences d’affichage" : "Display preferences"}
    >
      <LanguageSelect
        className="preference-button"
        title={fr ? "Langue : français" : "Language: English"}
      >
        <Languages size={17} aria-hidden="true" />
      </LanguageSelect>
      <button
        type="button"
        className="preference-button"
        aria-label={fr ? "Changer de thème" : "Toggle Theme"}
        title={fr ? "Changer de thème" : "Toggle Theme"}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <Sun size={17} className="preference-sun" aria-hidden="true" />
        <Moon size={17} className="preference-moon" aria-hidden="true" />
      </button>
    </div>
  );
}
