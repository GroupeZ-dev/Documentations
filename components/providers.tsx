"use client";

import { RootProvider } from "fumadocs-ui/provider/base";
import { FrameworkProvider } from "fumadocs-core/framework";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";
import type { Locale } from "@/lib/site";
import { fumadocsFrench } from "@/messages/fumadocs-fr";
import { ScopedSearchDialog } from "./scoped-search";
import { McpDialogProvider } from "./mcp-dialog";

// English pages are statically generated under /en and publicly rewritten to /.
// Fumadocs must see the same public pathname during SSG and client hydration.
function usePublicPathname() {
  return usePathname().replace(/^\/en(?=\/|$)/, "") || "/";
}
function PublicLink({
  href,
  ...props
}: ComponentProps<"a"> & { prefetch?: boolean }) {
  return <Link href={href || "#"} {...props} />;
}

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <FrameworkProvider
      usePathname={usePublicPathname}
      useRouter={useRouter}
      useParams={useParams}
      Link={PublicLink}
    >
      <RootProvider
        theme={{
          defaultTheme: "system",
          enableSystem: true,
          // Execute the bootstrap in SSR HTML only. Client mounts apply the
          // theme through next-themes effects, without inserting executable JS.
          scriptProps: {
            type:
              typeof window === "undefined" ? "text/javascript" : "text/plain",
          },
        }}
        i18n={{
          locale,
          defaultLanguage: "en",
          hideLocale: "default-locale",
          locales: [
            { locale: "en", name: "English" },
            { locale: "fr", name: "Français" },
          ],
          translations: locale === "fr" ? fumadocsFrench : undefined,
        }}
        search={{
          SearchDialog: ScopedSearchDialog,
          options: { api: "/api/search" },
        }}
      >
        <McpDialogProvider locale={locale}>{children}</McpDialogProvider>
      </RootProvider>
    </FrameworkProvider>
  );
}
