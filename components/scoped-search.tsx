"use client";

import type { DefaultSearchDialogProps } from "fumadocs-ui/components/dialog/search-default";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { usePathname } from "fumadocs-core/framework";
import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import {
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogClose,
  SearchDialogList,
  SearchDialogListItem,
} from "fumadocs-ui/components/dialog/search";
import { useState, type ComponentProps } from "react";
import projects from "@/.generated/projects.json";

const SearchResult: NonNullable<
  ComponentProps<typeof SearchDialogList>["Item"]
> = ({ item, ...props }) => {
  if (item.type === "action") {
    return <SearchDialogListItem {...props} item={item} />;
  }

  const projectId = item.url.replace(/^\/fr(?=\/|$)/, "").split("/")[1];
  const project = projects.find((candidate) => candidate.id === projectId);
  if (!project) return <SearchDialogListItem {...props} item={item} />;

  return (
    <SearchDialogListItem
      {...props}
      className="search-result"
      data-result-type={item.type}
      item={{
        ...item,
        breadcrumbs: [
          <span key="project" className="search-result-project">
            {project.name}
          </span>,
          <span key="destination" className="search-result-destination">
            {item.url}
          </span>,
        ],
      }}
    />
  );
};

export function ScopedSearchDialog(props: DefaultSearchDialogProps) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const id = pathname.replace(/^\/fr(?=\/|$)/, "").split("/")[1];
  const project = projects.find((candidate) => candidate.id === id);
  return (
    <ProjectSearchDialog
      {...props}
      key={`${locale}:${project?.id || "all"}`}
      project={project}
    />
  );
}

function ProjectSearchDialog({
  project,
  ...props
}: DefaultSearchDialogProps & { project?: { id: string; name: string } }) {
  const { locale } = useI18n();
  const [scope, setScope] = useState(project?.id || "all");
  const search = useDocsSearch({
    client: fetchClient({ api: props.api, locale, tag: scope }),
  });
  return (
    <SearchDialog
      {...search}
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {project && (
          <div
            className="search-scope"
            role="group"
            aria-label={
              locale === "fr" ? "Périmètre de recherche" : "Search scope"
            }
          >
            <button
              type="button"
              aria-pressed={scope === project.id}
              onClick={() => setScope(project.id)}
            >
              {locale === "fr" ? "Dans" : "In"} {project.name}
            </button>
            <button
              type="button"
              aria-pressed={scope === "all"}
              onClick={() => setScope("all")}
            >
              {locale === "fr" ? "Toute la documentation" : "All documentation"}
            </button>
          </div>
        )}
        <SearchDialogList Item={SearchResult} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
