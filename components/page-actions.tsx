"use client";

import { useRef, useState } from "react";
import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  Plug,
  Sparkles,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "fumadocs-ui/components/ui/popover";
import { useMcpDialog } from "./mcp-dialog";
import type { Locale } from "@/lib/site";

export function PageActions({
  locale,
  url,
  title,
}: {
  locale: Locale;
  url: string;
  title: string;
}) {
  const fr = locale === "fr";
  const openMcp = useMcpDialog();
  const openingMcp = useRef(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [links, setLinks] = useState({ chatgpt: "", claude: "" });
  const markdown = `/api/markdown?url=${encodeURIComponent(url)}`;
  const copyLabel = fr ? "Copier la page en Markdown" : "Copy page as Markdown";
  async function copy() {
    try {
      setError(false);
      const response = await fetch(markdown);
      if (!response.ok) throw new Error("Markdown unavailable");
      await navigator.clipboard.writeText(await response.text());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
    }
  }
  function prepareLinks(open: boolean) {
    if (!open) return;
    const page = new URL(url, window.location.origin).href;
    const endpoint = `${window.location.origin}/api/mcp`;
    const prompt = fr
      ? `Aide-moi à comprendre la page « ${title} » : ${page}. Si le MCP GroupeZ (${endpoint}) est connecté, utilise search puis get_page pour consulter cette page. Sinon, lis la page accessible à cette adresse ; si tu ne peux pas la lire, demande-moi son Markdown. Cite tes sources et conserve les commandes et clés YAML exactes. Réponds dans la langue de mon message.`
      : `Help me understand "${title}": ${page}. If GroupeZ MCP (${endpoint}) is connected, use search then get_page to read this page. Otherwise read the linked page; if you cannot access it, ask me to paste its Markdown. Cite sources and preserve exact commands and YAML keys. Answer in my message's language.`;
    setLinks({
      chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    });
  }
  return (
    <nav
      className="page-tools"
      aria-label={fr ? "Actions de la page" : "Page actions"}
    >
      <Popover onOpenChange={prepareLinks}>
        <PopoverTrigger className="page-action">
          {copied ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <Copy size={15} aria-hidden="true" />
          )}
          {fr ? "Copier la page" : "Copy page"}
          <ChevronDown size={13} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="page-open-menu"
          aria-label={
            fr ? "Copier ou utiliser cette page" : "Copy or use this page"
          }
          onCloseAutoFocus={(event) => {
            // Wait for the popover's focus/Escape layer to close before opening the modal.
            if (openingMcp.current) {
              event.preventDefault();
              openingMcp.current = false;
              openMcp();
            }
          }}
        >
          <PopoverClose
            className="page-menu-item"
            aria-label={copyLabel}
            onClick={copy}
          >
            <Copy size={17} aria-hidden="true" />
            <span>
              <strong>{fr ? "Copier la page" : "Copy page"}</strong>
              <small>
                {fr
                  ? "Copier en Markdown pour une IA"
                  : "Copy page as Markdown for an AI"}
              </small>
            </span>
          </PopoverClose>
          <a
            className="page-menu-item"
            href={markdown}
            target="_blank"
            rel="noreferrer"
            aria-label={fr ? "Voir en Markdown" : "View as Markdown"}
          >
            <FileText size={17} aria-hidden="true" />
            <span>
              <strong>
                {fr ? "Voir en Markdown" : "View as Markdown"}
                <ExternalLink size={12} aria-hidden="true" />
              </strong>
              <small>
                {fr
                  ? "Lire le contenu en texte brut"
                  : "View this page as plain text"}
              </small>
            </span>
          </a>
          <hr />
          <a
            className="page-menu-item"
            href={links.chatgpt}
            target="_blank"
            rel="noreferrer"
            aria-label={fr ? "Ouvrir dans ChatGPT" : "Open in ChatGPT"}
          >
            <Bot size={17} aria-hidden="true" />
            <span>
              <strong>
                {fr ? "Ouvrir dans ChatGPT" : "Open in ChatGPT"}
                <ExternalLink size={12} aria-hidden="true" />
              </strong>
              <small>
                {fr
                  ? "Poser des questions sur cette page"
                  : "Ask questions about this page"}
              </small>
            </span>
          </a>
          <a
            className="page-menu-item"
            href={links.claude}
            target="_blank"
            rel="noreferrer"
            aria-label={fr ? "Ouvrir dans Claude" : "Open in Claude"}
          >
            <Sparkles size={17} aria-hidden="true" />
            <span>
              <strong>
                {fr ? "Ouvrir dans Claude" : "Open in Claude"}
                <ExternalLink size={12} aria-hidden="true" />
              </strong>
              <small>
                {fr
                  ? "Poser des questions sur cette page"
                  : "Ask questions about this page"}
              </small>
            </span>
          </a>
          <hr />
          <PopoverClose
            className="page-menu-item"
            aria-label={
              fr ? "Connecter une IA avec MCP" : "Connect an AI with MCP"
            }
            onClick={() => {
              openingMcp.current = true;
            }}
          >
            <Plug size={17} aria-hidden="true" />
            <span>
              <strong>
                {fr ? "Connecter une IA avec MCP" : "Connect an AI with MCP"}
              </strong>
              <small>
                {fr
                  ? "Consulter le wiki depuis ton outil d’IA"
                  : "Use the documentation in your AI tool"}
              </small>
            </span>
          </PopoverClose>
        </PopoverContent>
      </Popover>
      <span className="page-action-status" role="status">
        {error
          ? fr
            ? "Copie indisponible. Ouvre la version Markdown dans le menu."
            : "Copy unavailable. Open Markdown from the menu."
          : copied
            ? fr
              ? "Markdown copié"
              : "Markdown copied"
            : ""}
      </span>
    </nav>
  );
}
