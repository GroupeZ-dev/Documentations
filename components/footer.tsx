import {
  BookOpen,
  CalendarDays,
  GitCommitHorizontal,
  History,
  Pencil,
  UserRound,
} from "lucide-react";
import { branch, repository, type Locale } from "@/lib/site";
import build from "@/.generated/build-info.json";
import fileCommits from "@/.generated/git-info.json";
import { DiscordIcon } from "./brand-icons";

type Commit = {
  revision: string;
  date: string;
  subject: string;
  author: string;
  authorLogin?: string;
};

function CommitDetails({ commit, locale }: { commit: Commit; locale: Locale }) {
  const fr = locale === "fr";
  return (
    <div className="commit-details">
      <a
        className="commit-subject"
        href={`https://github.com/${repository}/commit/${commit.revision}`}
        target="_blank"
        rel="noreferrer"
      >
        {commit.subject}
      </a>
      <dl>
        <div>
          <dt>
            <GitCommitHorizontal size={14} aria-hidden="true" />
            <span className="sr-only">Commit</span>
          </dt>
          <dd>
            <a
              href={`https://github.com/${repository}/commit/${commit.revision}`}
              target="_blank"
              rel="noreferrer"
              title={commit.revision}
            >
              <code>{commit.revision.slice(0, 7)}</code>
            </a>
          </dd>
        </div>
        {commit.author && (
          <div>
            <dt>
              <UserRound size={14} aria-hidden="true" />
              <span className="sr-only">{fr ? "Auteur" : "Author"}</span>
            </dt>
            <dd>
              {commit.authorLogin ? (
                <a
                  href={`https://github.com/${repository}/commits?author=${encodeURIComponent(commit.authorLogin)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {commit.authorLogin}
                </a>
              ) : (
                commit.author
              )}
            </dd>
          </div>
        )}
        {commit.date && (
          <div>
            <dt>
              <CalendarDays size={14} aria-hidden="true" />
              <span className="sr-only">Date</span>
            </dt>
            <dd>
              <time dateTime={commit.date}>
                {new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", {
                  dateStyle: "medium",
                  timeZone: "UTC",
                }).format(new Date(commit.date))}
              </time>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function Footer({
  locale,
  sourcePath,
  editUrl,
}: {
  locale: Locale;
  sourcePath?: string;
  editUrl?: string;
}) {
  const fr = locale === "fr";
  const pageCommit = sourcePath
    ? (fileCommits as Record<string, Commit>)[sourcePath]
    : undefined;
  const historyUrl = `https://github.com/${repository}/commits/${branch}/${sourcePath || ""}`;
  return (
    <footer className={`site-footer${sourcePath ? " docs-footer" : ""}`}>
      {sourcePath && (
        <div className="page-maintenance">
          <section
            className="contribution-card"
            aria-label={fr ? "Contribuer" : "Contribute"}
          >
            <h2>
              <BookOpen size={17} aria-hidden="true" />
              {fr
                ? "Améliorons cette documentation"
                : "Help improve this documentation"}
            </h2>
            <p>
              {fr
                ? "Une erreur ou une précision à apporter ? Propose une modification ou consulte l’historique de cette page."
                : "Found an error or something to clarify? Suggest a change or explore this page’s history."}
            </p>
            <div>
              <a
                href="https://discord.groupez.dev"
                target="_blank"
                rel="noreferrer"
              >
                <DiscordIcon />
                {fr ? "Aide sur Discord" : "Discord support"}
              </a>
              <a href={editUrl} target="_blank" rel="noreferrer">
                <Pencil size={14} aria-hidden="true" />
                {fr ? "Modifier cette page" : "Edit this page"}
              </a>
              <a href={historyUrl} target="_blank" rel="noreferrer">
                <History size={14} aria-hidden="true" />
                {fr ? "Historique" : "History"}
              </a>
            </div>
          </section>
          <section
            className="revision-card"
            aria-label={
              fr ? "Dernière modification de la page" : "Last page change"
            }
          >
            <h2>
              <History size={17} aria-hidden="true" />
              {fr ? "Dernière modification" : "Last updated"}
            </h2>
            {pageCommit ? (
              <CommitDetails commit={pageCommit} locale={locale} />
            ) : (
              <p>
                <a href={historyUrl} target="_blank" rel="noreferrer">
                  {fr
                    ? "Consulter l’historique sur GitHub"
                    : "View history on GitHub"}
                </a>
              </p>
            )}
          </section>
        </div>
      )}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          <a href="https://groupez.dev">GroupeZ</a>
        </span>
        {build.revision ? (
          <span className="build-version">
            <GitCommitHorizontal size={14} aria-hidden="true" />
            {fr ? "Version déployée" : "Deployed version"}{" "}
            <a
              href={`https://github.com/${repository}/commit/${build.revision}`}
              target="_blank"
              rel="noreferrer"
              title={build.revision}
            >
              <code>{build.revision.slice(0, 7)}</code>
            </a>
          </span>
        ) : (
          <span>{fr ? "Version locale" : "Local build"}</span>
        )}
      </div>
    </footer>
  );
}
