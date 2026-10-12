import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";

const copy = {
  section: { en: "How I test", es: "Cómo pruebo" },
  intro: {
    en: "The same loop on every feature. The last step feeds the first.",
    es: "El mismo ciclo en cada feature. El último paso alimenta al primero.",
  },
  loop: { en: "back to 01", es: "vuelve a 01" },
};

/** The test process as a single line with six stops; horizontal on desktop, vertical on mobile. */
export function Process({ lang, index }: { lang: Locale; index: number }) {
  return (
    <section aria-labelledby="process" className="scroll-mt-24 py-16 md:py-24">
      <SectionHeading id="process" index={index} title={t(copy.section, lang)} />
      <p className="mt-8 max-w-[40ch] font-serif text-3xl leading-tight md:text-4xl">
        {t(copy.intro, lang)}
      </p>

      <ol className="relative mt-14 grid gap-10 border-l border-rule pl-6 md:grid-cols-6 md:gap-6 md:border-t md:border-l-0 md:pt-8 md:pl-0">
        {profile.process.map((step, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[29px] size-[9px] rounded-full border border-ink bg-paper md:-top-[37px] md:left-0"
            />
            <p className="font-mono text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-lg font-medium">{t(step.title, lang)}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{t(step.body, lang)}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 font-mono text-xs text-ink-muted md:text-right">↺ {t(copy.loop, lang)}</p>
    </section>
  );
}
