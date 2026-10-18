import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>Page not found / Page introuvable</h1>
      <p>The documentation page you requested does not exist.</p>
      <Link className="button-primary" href="/">
        GroupeZ Docs
      </Link>
    </main>
  );
}
