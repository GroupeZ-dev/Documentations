"use client";

import { useState } from "react";
import Link from "next/link";
import { Blocks, Check, ChevronsUpDown, Library } from "lucide-react";
import { useSidebar } from "fumadocs-ui/components/sidebar/base";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import type { Locale } from "@/lib/site";

export type ProjectOption = {
  id: string;
  name: string;
  group: string;
  url: string;
};

export function ProjectSwitcher({
  locale,
  options,
  activeProject,
}: {
  locale: Locale;
  options: ProjectOption[];
  activeProject: string;
}) {
  const [open, setOpen] = useState(false);
  const sidebar = useSidebar();
  const selected = options.find((p) => p.id === activeProject);
  const Icon = selected?.group === "projects" ? Library : Blocks;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="project-switcher"
        title={
          locale === "fr" ? "Choisir une documentation" : "Choose documentation"
        }
      >
        <Icon size={17} aria-hidden="true" />
        <span>
          {selected?.name ||
            (locale === "fr" ? "Choisir un projet" : "Choose a project")}
        </span>
        <ChevronsUpDown size={14} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        className="project-switcher-menu"
        aria-label={
          locale === "fr"
            ? "Documentations disponibles"
            : "Available documentation"
        }
      >
        {(["plugins", "projects"] as const).map((group) => {
          const GroupIcon = group === "plugins" ? Blocks : Library;
          return (
            <section
              key={group}
              aria-label={
                group === "plugins"
                  ? "Plugins"
                  : locale === "fr"
                    ? "Bibliothèques et projets"
                    : "Libraries and projects"
              }
            >
              <h2>
                <GroupIcon size={14} aria-hidden="true" />
                {group === "plugins"
                  ? "Plugins"
                  : locale === "fr"
                    ? "Bibliothèques et projets"
                    : "Libraries and projects"}
                <span>{options.filter((p) => p.group === group).length}</span>
              </h2>
              {options
                .filter((p) => p.group === group)
                .map((project) => (
                  <Link
                    key={project.id}
                    href={project.url}
                    aria-current={
                      selected?.id === project.id ? "true" : undefined
                    }
                    onClick={() => {
                      setOpen(false);
                      sidebar.setOpen(false);
                    }}
                  >
                    <span>{project.name}</span>
                    {selected?.id === project.id && (
                      <Check size={14} aria-hidden="true" />
                    )}
                  </Link>
                ))}
            </section>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
