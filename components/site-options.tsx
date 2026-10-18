import Image from "next/image";
import { DiscordIcon, GitHubIcon } from "./brand-icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { localize, type Locale } from "@/lib/site";
import { SidebarPreferences } from "./sidebar-preferences";

export function baseOptions(
  locale: Locale,
  documentation = false,
): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/img/logo.svg" width={28} height={28} alt="" />
          <span>
            GroupeZ <span className="brand-muted">Docs</span>
          </span>
        </>
      ),
      url: localize("/", locale),
      children: <SidebarPreferences locale={locale} />,
    },
    i18n: true,
    themeSwitch: { enabled: false },
    slots: { languageSelect: false as const },
    ...(!documentation && { searchToggle: { enabled: false } }),
    links: documentation
      ? []
      : [
          {
            text: "Discord",
            url: "https://discord.groupez.dev",
            icon: <DiscordIcon />,
            type: "icon",
            external: true,
          },
          {
            text: "GitHub",
            url: "https://github.com/GroupeZ-dev",
            icon: <GitHubIcon />,
            type: "icon",
            external: true,
          },
        ],
  };
}
