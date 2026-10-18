"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/site";

export function McpSetup({
  locale,
  endpoint,
}: {
  locale: Locale;
  endpoint: string;
}) {
  const fr = locale === "fr";
  const [client, setClient] = useState("chatgpt");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  const config = JSON.stringify(
    { mcpServers: { "groupez-docs": { url: endpoint } } },
    null,
    2,
  );
  const command = `claude mcp add --transport http groupez-docs ${endpoint}`;
  const example = fr
    ? "Utilise le MCP GroupeZ pour m’aider à créer un inventaire zMenu. Recherche les pages pertinentes, lis les exemples et cite tes sources."
    : "Use GroupeZ MCP to help me create a zMenu inventory. Search relevant pages, read the examples and cite your sources.";
  const guides: Record<string, { steps: string[]; docs: string }> = {
    chatgpt: {
      steps: fr
        ? [
            "Ouvre Plugins dans ChatGPT sur le web, puis + → Ajouter un serveur MCP personnalisé.",
            "Nomme-le « GroupeZ Documentation », colle l’URL ci-dessus et choisis « Aucune authentification ». Crée puis installe le plugin.",
            "Dans une conversation, tape @ et sélectionne ce plugin avant d’envoyer ta question. Si nécessaire, active search, get_page et list_pages dans ses paramètres.",
          ]
        : [
            "Open Plugins in ChatGPT on the web, then + → Add custom MCP server.",
            "Name it ‘GroupeZ Documentation’, paste the URL above and choose ‘No authentication’. Create and install the plugin.",
            "In a conversation, type @ and select the plugin before asking. If needed, enable search, get_page and list_pages in its settings.",
          ],
      docs: "https://developers.openai.com/api/docs/guides/custom-mcp-server",
    },
    claude: {
      steps: fr
        ? [
            "Dans Claude, ouvre Personnaliser → Connecteurs → Ajouter un connecteur personnalisé (les intitulés peuvent varier selon le compte).",
            "Nomme-le « GroupeZ Documentation », colle l’URL et sélectionne l’accès sans connexion lorsqu’il est proposé.",
            "Dans ta conversation, active le connecteur dans le menu + → Connecteurs, puis pose ta question. Sur un espace d’équipe, un administrateur peut devoir l’ajouter.",
          ]
        : [
            "In Claude, open Customize → Connectors → Add custom connector (labels may vary by account).",
            "Name it ‘GroupeZ Documentation’, paste the URL and select ‘No sign in’ when offered.",
            "Enable it in the conversation’s + → Connectors menu, then ask a question. A team workspace may require an administrator to add it.",
          ],
      docs: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
    },
    cursor: {
      steps: fr
        ? [
            "Ajoute cette configuration à .cursor/mcp.json dans ton projet, en conservant les éventuels serveurs déjà présents.",
            "Vérifie que « groupez-docs » est activé dans les réglages MCP de Cursor.",
            "Dans l’Agent, demande explicitement d’utiliser le MCP GroupeZ pour consulter la documentation.",
          ]
        : [
            "Add this configuration to your project’s .cursor/mcp.json, preserving any existing servers.",
            "Check that ‘groupez-docs’ is enabled in Cursor’s MCP settings.",
            "Ask the Agent to use GroupeZ MCP to consult the documentation.",
          ],
      docs: "https://cursor.com/docs/context/mcp",
    },
    code: {
      steps: fr
        ? [
            "Dans le terminal du projet, exécute la commande ci-dessous.",
            "Ouvre Claude Code et vérifie la connexion avec /mcp.",
            "Demande-lui ensuite d’utiliser groupez-docs pour chercher et lire les pages utiles.",
          ]
        : [
            "Run the command below in your project’s terminal.",
            "Open Claude Code and check the connection with /mcp.",
            "Ask it to use groupez-docs to search and read the relevant pages.",
          ],
      docs: "https://code.claude.com/docs/en/mcp",
    },
  };
  async function copy(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setCopyError(false);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section className="mcp-setup">
      <h2>
        {fr ? "La documentation dans ton IA" : "Documentation in your AI"}
      </h2>
      <p>
        {fr
          ? "Le MCP permet à ton IA de chercher dans la documentation GroupeZ et de lire les exemples à jour pour t’aider à configurer tes plugins."
          : "MCP lets your AI search GroupeZ documentation and read current examples to help you configure your plugins."}
      </p>
      <div className="mcp-facts">
        {fr
          ? "Lecture seule · Sans clé API côté documentation"
          : "Read-only · No documentation API key needed"}
      </div>
      <h3>{fr ? "1. Copie l’adresse du serveur" : "1. Copy the server URL"}</h3>
      <div className="mcp-copy">
        <code>{endpoint}</code>
        <button
          onClick={() => copy(endpoint, "url")}
          aria-label={fr ? "Copier l’URL MCP" : "Copy MCP URL"}
        >
          {copied === "url" ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>
      <p>
        {fr
          ? "Transport : HTTP (Streamable HTTP). Authentification : aucune. Ton outil utilise son propre modèle et ses propres limites d’abonnement."
          : "Transport: HTTP (Streamable HTTP). Authentication: none. Your tool uses its own model and subscription limits."}
      </p>
      <h3>
        <label htmlFor="mcp-client">
          {fr ? "2. Choisis ton outil" : "2. Choose your tool"}
        </label>
      </h3>
      <select
        id="mcp-client"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      >
        <option value="chatgpt">ChatGPT</option>
        <option value="claude">Claude</option>
        <option value="cursor">Cursor</option>
        <option value="code">Claude Code</option>
      </select>
      <ol className="mcp-steps">
        {guides[client].steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {(client === "cursor" || client === "code") && (
        <>
          <pre>
            <code>{client === "code" ? command : config}</code>
          </pre>
          <button
            className="page-action"
            onClick={() => copy(client === "code" ? command : config, "config")}
          >
            {copied === "config" ? <Check size={15} /> : <Copy size={15} />}
            {fr ? "Copier la configuration" : "Copy configuration"}
          </button>
        </>
      )}
      <a
        className="mcp-doc-link"
        href={guides[client].docs}
        target="_blank"
        rel="noreferrer"
      >
        {fr ? "Guide officiel de cet outil" : "Official setup guide"}
        <ExternalLink size={13} />
      </a>
      <h3>{fr ? "3. Pose une question" : "3. Ask a question"}</h3>
      <blockquote>{example}</blockquote>
      <button className="page-action" onClick={() => copy(example, "example")}>
        {copied === "example" ? <Check size={15} /> : <Copy size={15} />}
        {fr ? "Copier l’exemple" : "Copy example"}
      </button>
      <details>
        <summary>
          {fr
            ? "Autres clients et dépannage"
            : "Other clients and troubleshooting"}
        </summary>
        <p>
          {fr
            ? "Pour les clients utilisant mcpServers, adapte cet exemple à leur format :"
            : "For clients using mcpServers, adapt this example to their format:"}
        </p>
        <pre>
          <code>{config}</code>
        </pre>
        <p>
          {fr
            ? "Les outils disponibles sont search, get_page et list_pages. Après une mise à jour, actualise les outils du connecteur. Si ton IA n’y accède pas, vérifie que le connecteur est activé dans la conversation et que ton compte autorise les MCP personnalisés. Ouvrir l’URL dans un navigateur n’est pas un test MCP."
            : "Available tools are search, get_page and list_pages. Refresh the connector’s tools after updates. If your AI cannot access them, check that the connector is enabled in the conversation and your account allows custom MCP servers. Opening the URL in a browser is not an MCP test."}
        </p>
      </details>
      <p role="status">
        {copyError
          ? fr
            ? "La copie a échoué : sélectionne et copie le texte ci-dessus."
            : "Copy failed: select and copy the text above."
          : copied
            ? fr
              ? "Copié dans le presse-papiers."
              : "Copied to clipboard."
            : ""}
      </p>
    </section>
  );
}
