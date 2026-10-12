import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";

const copy = { label: { en: "Beyond QA", es: "Más allá de QA" } };

export function BeyondQa({ lang }: { lang: Locale }) {
  return (
    <section
      aria-labelledby="beyond-qa"
      className="grid gap-4 border-y border-rule py-12 md:grid-cols-[3fr_8fr] md:gap-14 md:py-16"
    >
      <h2 id="beyond-qa" className="font-mono text-sm text-ink-muted">
        {t(copy.label, lang)}
      </h2>
      <p className="max-w-[44ch] font-serif text-2xl leading-snug md:text-3xl">
        {t(profile.beyondQa, lang)}
      </p>
    </section>
  );
}
