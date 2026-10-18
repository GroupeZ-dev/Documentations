"use client";

import { useHomeLayout } from "fumadocs-ui/layouts/home";
import { useI18n } from "fumadocs-ui/contexts/i18n";

// The homepage already exposes navigation and search in its introduction.
// Keep the sticky header for identity, display preferences and external links.
export function HomeHeader() {
  const {
    props: { nav },
    slots,
    navItems,
  } = useHomeLayout();
  const { locale } = useI18n();
  const Title = slots.navTitle;
  return (
    <header id="nd-nav" className="home-header">
      <nav
        className="home-header-inner"
        aria-label={
          locale === "fr" ? "Outils de la documentation" : "Documentation tools"
        }
      >
        {Title && <Title className="home-brand" />}
        <div className="home-header-utilities">
          {nav?.children}
          <span className="home-utility-divider" aria-hidden="true" />
          {navItems
            .filter((item) => item.type === "icon")
            .map((item) => (
              <a
                key={item.url}
                className="home-utility-link"
                href={item.url}
                title={typeof item.text === "string" ? item.text : undefined}
                target="_blank"
                rel="noreferrer"
              >
                {item.icon}
                <span className="sr-only">{item.text}</span>
              </a>
            ))}
        </div>
      </nav>
    </header>
  );
}
