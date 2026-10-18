import {
  ArrowRight,
  Blocks,
  BookOpen,
  Code2,
  ExternalLink,
  Library,
  Plug,
} from "lucide-react";
import { projects, manifest } from "@/lib/source";
import { message, repository, type Locale } from "@/lib/site";
import { projectCatalogue } from "@/lib/project-catalogue";
import { McpLink } from "./mcp-link";
import { HomeSearch } from "./home-search";
import { ProjectCatalogue } from "./project-catalogue";
import { DiscordIcon, GitHubIcon } from "./brand-icons";

export function Home({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const t = (key: string) => message(locale, `homepage.${key}`);
  const entries = projects.map((project) => {
    const pages = manifest.filter(
      (page) => page.project === project.id && page.locale === locale,
    );
    const page =
      pages.find(
        (page) =>
          page.slug ===
          (project.id === "zmenu" || project.id === "zquests"
            ? "getting-started"
            : "introduction"),
      ) || pages[0];
    const info = projectCatalogue[project.id];
    return {
      id: project.id,
      name: project.name,
      group: project.group,
      incomplete: project.incomplete,
      url: page.url,
      description:
        info?.[locale] ||
        page.description ||
        (fr
          ? "Guides et références du projet."
          : "Project guides and references."),
      image: info?.resource
        ? `https://groupez.dev/storage/images/resources/icons/${info.resource}.webp`
        : undefined,
    };
  });
  return (
    <div className="home-content">
      <section className="home-intro" aria-labelledby="home-title">
        <div>
          <span className="eyebrow">
            <BookOpen size={15} aria-hidden="true" />
            {t("badge")}
          </span>
          <h1 id="home-title">
            GroupeZ <span>Docs</span>
          </h1>
          <p className="home-description">{t("tagline")}</p>
          <nav
            className="home-shortcuts"
            aria-label={
              fr ? "Explorer la documentation" : "Explore the documentation"
            }
          >
            <a href="#documentation">
              <Blocks size={16} aria-hidden="true" />
              Plugins{" "}
              <span>{entries.filter((p) => p.group === "plugins").length}</span>
            </a>
            <a href="#projects">
              <Library size={16} aria-hidden="true" />
              {t("projectsLabel")}{" "}
              <span>
                {entries.filter((p) => p.group === "projects").length}
              </span>
            </a>
          </nav>
        </div>
        <aside className="home-search-panel" aria-label={t("searchTitle")}>
          <h2>{t("searchTitle")}</h2>
          <p>{t("searchDescription")}</p>
          <HomeSearch locale={locale} />
          <div className="home-search-examples">
            <Code2 size={14} aria-hidden="true" />
            {t("searchExamples")}
          </div>
        </aside>
      </section>
      <ProjectCatalogue entries={entries} locale={locale} />
      <section className="home-resources" aria-labelledby="resources-title">
        <header>
          <h2 id="resources-title">{t("resourcesTitle")}</h2>
          <p>{t("resourcesDescription")}</p>
        </header>
        <div className="resource-grid">
          <article>
            <span className="resource-icon">
              <DiscordIcon width={21} height={21} />
            </span>
            <h3>{t("supportTitle")}</h3>
            <p>{t("supportDescription")}</p>
            <a
              className="page-action"
              href="https://discord.groupez.dev/"
              target="_blank"
              rel="noreferrer"
            >
              Discord <ExternalLink size={14} aria-hidden="true" />
            </a>
          </article>
          <article>
            <span className="resource-icon">
              <Plug size={21} aria-hidden="true" />
            </span>
            <h3>{t("mcpTitle")}</h3>
            <p>{t("mcpDescription")}</p>
            <McpLink locale={locale} />
          </article>
          <article>
            <span className="resource-icon">
              <GitHubIcon width={21} height={21} />
            </span>
            <h3>{t("contributeTitle")}</h3>
            <p>{t("contributeDescription")}</p>
            <a
              className="page-action"
              href={`https://github.com/${repository}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ExternalLink size={14} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>
      <section className="home-partner" aria-label={t("sponsor.badge")}>
        <div>
          <span>{t("sponsor.badge")}</span>
          <img
            src="/img/minestrator.svg"
            alt=""
            width={28}
            height={28}
            loading="lazy"
          />
          <strong>MineStrator</strong>
        </div>
        <p>
          {t("partnerDescription")} <code>GROUPEZ</code>
        </p>
        <a
          href="https://minestrator.com/a/GROUPEZ"
          target="_blank"
          rel="noreferrer"
        >
          {t("sponsor.cta")}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
