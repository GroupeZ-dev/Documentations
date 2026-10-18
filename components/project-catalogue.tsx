"use client";

import Link from "next/link";
import { ArrowRight, Blocks, Library } from "lucide-react";
import type { Locale } from "@/lib/site";

export type CatalogueEntry = {
  id: string;
  name: string;
  group: string;
  url: string;
  description: string;
  image?: string;
  incomplete: boolean;
};

export function ProjectCatalogue({
  entries,
  locale,
}: {
  entries: CatalogueEntry[];
  locale: Locale;
}) {
  const fr = locale === "fr";
  return (
    <div className="home-catalogue" id="catalogue">
      <div className="catalogue-toolbar">
        <div>
          <h2>
            {fr ? "Choisissez votre documentation" : "Find your documentation"}
          </h2>
          <p>
            {fr
              ? "Un outil, un espace dédié : guides, configuration et API."
              : "A dedicated space for each tool: guides, configuration and APIs."}
          </p>
        </div>
      </div>
      {(["plugins", "projects"] as const).map((group) => {
        const items = entries.filter((entry) => entry.group === group);
        if (!items.length) return null;
        const Icon = group === "plugins" ? Blocks : Library;
        return (
          <section
            className="catalogue"
            id={group === "plugins" ? "documentation" : "projects"}
            key={group}
            aria-labelledby={`catalogue-${group}`}
          >
            <header className="catalogue-heading">
              <h3 id={`catalogue-${group}`}>
                <Icon size={19} aria-hidden="true" />
                {group === "plugins"
                  ? "Plugins"
                  : fr
                    ? "Bibliothèques et projets"
                    : "Libraries and projects"}
                <span>{items.length}</span>
              </h3>
              <p>
                {group === "plugins"
                  ? fr
                    ? "Pour votre serveur Minecraft"
                    : "For your Minecraft server"
                  : fr
                    ? "Pour vos intégrations et développements"
                    : "For your integrations and development"}
              </p>
            </header>
            <div className="project-grid">
              {items.map((entry) => (
                <Link className="project-card" href={entry.url} key={entry.id}>
                  <div className="project-card-heading">
                    <span className="project-icon">
                      <Icon size={23} aria-hidden="true" />
                      {entry.image && (
                        <img
                          src={entry.image}
                          alt=""
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          ref={(image) => {
                            // An image can fail before hydration attaches onError.
                            if (image?.complete && !image.naturalWidth)
                              image.hidden = true;
                          }}
                          onError={(event) => {
                            event.currentTarget.hidden = true;
                          }}
                        />
                      )}
                    </span>
                    <h4>{entry.name}</h4>
                    <ArrowRight
                      size={17}
                      className="card-arrow"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="project-description">{entry.description}</p>
                  <div className="project-card-footer">
                    <span>
                      {fr ? "Voir la documentation" : "View documentation"}
                    </span>
                    {entry.incomplete && (
                      <span className="project-status">
                        {fr ? "À compléter" : "To be completed"}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
