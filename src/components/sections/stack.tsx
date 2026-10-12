import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";

const copy = { section: { en: "Stack", es: "Stack" } };

/** Tools grouped by what they're for. No skill bars, no percentages. */
export function Stack({ lang, index }: { lang: Locale; index: number }) {
  return (
    <section aria-labelledby="stack" className="scroll-mt-24 py-16 md:py-24">
      <SectionHeading id="stack" index={index} title={t(copy.section, lang)} />
      <dl className="mt-10 font-mono text-sm">
        {profile.stack.map((group) => (
          <div
            key={group.group.en}
            className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
          >
            <dt className="text-ink-muted">{t(group.group, lang)}</dt>
            <dd className="text-ink">{group.items.join(" / ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
