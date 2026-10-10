import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { CountUp } from "@/components/count-up";

const copy = {
  heading: { en: "The numbers", es: "Los números" },
  intro: {
    en: "What the work adds up to so far.",
    es: "Lo que suma el trabajo hasta ahora.",
  },
  summary: { en: "passed", es: "passed" },
};

/** Metrics shown as a Playwright run: one passing check per number. */
export function Metrics({ lang }: { lang: Locale }) {
  const count = profile.metrics.length;

  return (
    <section aria-labelledby="metrics-heading" className="py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[3fr_8fr] md:gap-14">
        <div>
          <h2 id="metrics-heading" className="font-serif text-4xl leading-none md:text-5xl">
            {t(copy.heading, lang)}
          </h2>
          <p className="mt-4 max-w-[26ch] text-ink-muted">{t(copy.intro, lang)}</p>
        </div>

        <div className="border border-rule bg-paper-raised font-mono">
          <div className="flex justify-between gap-4 border-b border-rule px-4 py-3 text-xs text-ink-muted sm:px-5">
            <span className="truncate">$ npx playwright test --project=victor</span>
            <span className="hidden sm:inline">chromium</span>
          </div>

          <ol>
            {profile.metrics.map((m, i) => (
              <li
                key={i}
                className="grid grid-cols-[1.25rem_1fr] gap-x-3 border-b border-rule px-4 py-5 last:border-b-0 sm:grid-cols-[1.25rem_14rem_1fr] sm:items-baseline sm:px-5"
              >
                <span className="text-pass" aria-hidden="true">
                  ✓
                </span>
                <p className="font-serif text-5xl leading-none tracking-tight sm:text-6xl">
                  {"prefix" in m ? (
                    <span className="tabular-nums">
                      {m.prefix}
                      {m.value}
                    </span>
                  ) : (
                    <CountUp value={m.value} />
                  )}
                  <span className="text-[0.6em]">
                    {typeof m.suffix === "string" ? m.suffix : t(m.suffix, lang)}
                  </span>
                </p>
                <div className="col-start-2 mt-3 sm:col-start-3 sm:mt-0">
                  <p className="font-sans text-base">{t(m.label, lang)}</p>
                  <p className="mt-1 font-sans text-sm text-ink-muted">{t(m.context, lang)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex justify-between border-t border-rule px-4 py-3 text-[13px] sm:px-5">
            <span className="text-pass">
              {count} {t(copy.summary, lang)}
            </span>
            <span className="text-ink-muted">0 failed · 0 skipped</span>
          </div>
        </div>
      </div>
    </section>
  );
}
