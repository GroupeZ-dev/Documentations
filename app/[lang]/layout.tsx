import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import { Advertising } from "@/components/advertising";
import { isLocale, official, siteUrl } from "@/lib/site";
import "../global.css";

export const viewport: Viewport = { themeColor: "#00a8ff" };

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "GroupeZ Docs", template: "%s | GroupeZ Docs" },
  description: "Documentation for GroupeZ Minecraft plugins",
  icons: { icon: "/img/favicon.ico" },
  robots: { index: official, follow: official },
};
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers locale={lang}>
          {children}
          <Advertising />
        </Providers>
      </body>
    </html>
  );
}
