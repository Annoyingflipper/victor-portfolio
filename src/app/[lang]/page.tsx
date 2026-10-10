import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { hasLocale, t } from "@/lib/i18n";

/** Phase 3 setup check: tokens and type scale. Replaced by the real sections in phase 5. */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const swatches = ["paper", "paper-raised", "ink", "ink-muted", "rule", "pass", "bug"];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-10">
      <p className="font-mono text-sm text-ink-muted">setup check · {lang}</p>
      <h1 className="mt-6 font-serif text-7xl leading-[0.9] tracking-tight sm:text-9xl">
        {profile.name}
      </h1>
      <p className="mt-4 font-serif text-3xl text-ink-muted italic">{t(profile.role, lang)}</p>
      <p className="mt-8 max-w-[34ch] text-xl">{t(profile.positioning, lang)}</p>
      <p className="mt-8 border-t border-rule pt-4 font-mono text-sm text-ink-muted">
        <span className="text-pass">✓ passed</span>&nbsp; {t(profile.runLine, lang)}
      </p>
      <ul className="mt-12 grid grid-cols-2 gap-4 font-mono text-xs sm:grid-cols-7">
        {swatches.map((name) => (
          <li key={name}>
            <div className="h-16 border border-rule" style={{ background: `var(--${name})` }} />
            <p className="mt-2">--{name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
