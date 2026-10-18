import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { Callout } from "fumadocs-ui/components/callout";
import { source, getTree, manifest, projects } from "@/lib/source";
import {
  branch,
  isLocale,
  localize,
  message,
  repository,
  siteUrl,
} from "@/lib/site";
import { baseOptions } from "@/components/site-options";
import { Home } from "@/components/home";
import { HomeHeader } from "@/components/home-header";
import { Footer } from "@/components/footer";
import { PageActions } from "@/components/page-actions";
import { ProjectSwitcher } from "@/components/project-switcher";
import { getMDXComponents } from "@/mdx-components";

type Props = { params: Promise<{ lang: string; slug?: string[] }> };
export function generateStaticParams() {
  return [
    { lang: "en", slug: [] },
    { lang: "fr", slug: [] },
    ...manifest.map((p) => ({
      lang: p.locale,
      slug: p.url
        .replace(/^\/fr(?=\/)/, "")
        .split("/")
        .filter(Boolean),
    })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params;
  if (!isLocale(lang)) return {};
  const pathname = "/" + slug.join("/");
  const page = source.getPage(slug, lang);
  const description =
    page?.data.description ||
    (!slug.length ? message(lang, "homepage.description") : undefined);
  return {
    title: page?.data.title || (lang === "fr" ? "Accueil" : "Home"),
    description,
    openGraph: {
      title: page?.data.title || "GroupeZ Docs",
      description,
      siteName: "GroupeZ Docs",
      url: localize(pathname, lang),
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_GB",
    },
    twitter: {
      card: "summary",
      title: page?.data.title || "GroupeZ Docs",
      description,
    },
    alternates: {
      canonical: localize(pathname, lang),
      languages: { en: pathname, fr: localize(pathname, "fr") },
    },
  };
}
export default async function Page({ params }: Props) {
  const { lang, slug = [] } = await params;
  if (!isLocale(lang)) notFound();
  if (!slug.length) {
    const options = baseOptions(lang);
    return (
      <HomeLayout {...options} slots={{ ...options.slots, header: HomeHeader }}>
        <link
          rel="discord:component-embed"
          type="application/json"
          href={
            new URL(
              `/api/discord?url=${encodeURIComponent(localize("/", lang))}`,
              siteUrl,
            ).href
          }
        />
        <Home locale={lang} />
        <Footer locale={lang} />
      </HomeLayout>
    );
  }
  if (slug.length === 1) {
    const first =
      manifest.find(
        (p) =>
          p.locale === lang &&
          p.project === slug[0] &&
          ["getting-started", "introduction"].includes(p.slug),
      ) || manifest.find((p) => p.locale === lang && p.project === slug[0]);
    if (first) permanentRedirect(first.url);
  }
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  const editUrl = `https://github.com/${repository}/edit/${branch}/${page.data.sourcePath}`;
  return (
    <DocsLayout
      {...baseOptions(lang, true)}
      tree={getTree(lang)}
      tabs={false}
      sidebar={{
        banner: (
          <ProjectSwitcher
            key="project-switcher"
            locale={lang}
            activeProject={slug[0]}
            options={projects.map((project) => ({
              ...project,
              url:
                manifest.find(
                  (p) =>
                    p.locale === lang &&
                    p.project === project.id &&
                    ["getting-started", "introduction"].includes(p.slug),
                )?.url ||
                manifest.find(
                  (p) => p.locale === lang && p.project === project.id,
                )!.url,
            }))}
          />
        ),
      }}
      containerProps={{
        style: {
          gridTemplate:
            '"sidebar header toc" "sidebar toc-popover toc" "sidebar tabs toc" "sidebar main toc" 1fr / var(--fd-sidebar-col) minmax(0, 1fr) var(--fd-toc-width)',
        },
      }}
    >
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        footer={{
          children: (
            <Footer
              locale={lang}
              sourcePath={page.data.sourcePath}
              editUrl={editUrl}
            />
          ),
        }}
      >
        <link
          rel="discord:component-embed"
          type="application/json"
          href={
            new URL(`/api/discord?url=${encodeURIComponent(page.url)}`, siteUrl)
              .href
          }
        />
        <header className="docs-page-header">
          <DocsTitle>{page.data.title}</DocsTitle>
          {page.data.description && (
            <DocsDescription>{page.data.description}</DocsDescription>
          )}
          <PageActions locale={lang} url={page.url} title={page.data.title} />
        </header>
        {page.data.fallback && (
          <Callout type="info">
            {lang === "fr"
              ? "Cette page est affichée en anglais car sa traduction française n’est pas encore disponible."
              : "Translation unavailable."}
          </Callout>
        )}
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
