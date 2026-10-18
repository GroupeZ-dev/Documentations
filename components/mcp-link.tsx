"use client";

import { Plug } from "lucide-react";
import { useMcpDialog } from "./mcp-dialog";
import type { Locale } from "@/lib/site";

export function McpLink({ locale }: { locale: Locale }) {
  const openMcp = useMcpDialog();
  return (
    <button
      type="button"
      className="page-action"
      onClick={openMcp}
      title={
        locale === "fr"
          ? "Connecter ton outil d’IA à la documentation"
          : "Connect your AI tool to the documentation"
      }
    >
      <Plug size={15} aria-hidden="true" /> MCP
    </button>
  );
}
