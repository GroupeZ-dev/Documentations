"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Plug, X } from "lucide-react";
import { McpSetup } from "./mcp-setup";
import type { Locale } from "@/lib/site";

const McpDialogContext = createContext<() => void>(() => {});
export const useMcpDialog = () => useContext(McpDialogContext);

export function McpDialogProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [endpoint, setEndpoint] = useState("");
  function open() {
    setEndpoint(`${window.location.origin}/api/mcp`);
    if (!dialog.current?.open) dialog.current?.showModal();
  }
  return (
    <McpDialogContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="mcp-dialog"
        aria-labelledby="mcp-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="mcp-panel">
          <header className="mcp-header">
            <span id="mcp-dialog-title">
              <Plug size={21} aria-hidden="true" />
              GroupeZ MCP
            </span>
            <button
              type="button"
              aria-label={
                locale === "fr" ? "Fermer le guide MCP" : "Close MCP guide"
              }
              onClick={() => dialog.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          <McpSetup locale={locale} endpoint={endpoint} />
        </div>
      </dialog>
    </McpDialogContext.Provider>
  );
}
