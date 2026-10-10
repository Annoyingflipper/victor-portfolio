import Link from "next/link";
import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { caseCopy, CaseSteps } from "@/components/case-steps";

/**
 * One large featured case plus the rest in an asymmetric grid.
 * Each case opens its own page at /[lang]/cases/[slug].
 */
export function Cases({ lang, index }: { lang: Locale; index: number }) {
  const [featured, ...rest] = profile.cases;

  return (
    <section aria-labelledby="cases" className="scroll-mt-24 py-16 md:py-24">
      <SectionHeading id="cases" index={index} title={t(caseCopy.section, lang)} />

      <article className="mt-10 grid gap-10 border-b border-rule pb-14 md:grid-cols-[5fr_6fr] md:gap-14">
        <div>
          <p className="font-mono text-xs text-ink-muted">{featured.tags.join(" / ")}</p>
          <h3 className="mt-4 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
            <Link
              href={`/${lang}/cases/${featured.slug}`}
              className="decoration-1 underline-offset-8 hover:underline"
            >
              {t(featured.title, lang)}
            </Link>
          </h3>

          {/* The one "bug" detail: the number everyone believed vs. the one in the data. */}
          <dl className="mt-8 grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm">
            <dt className="text-ink-muted">expected</dt>
            <dd className="text-bug line-through decoration-1">10,000,000+</dd>
            <dt className="text-ink-muted">actual</dt>
            <dd className="text-pass">~3,000,000</dd>
          </dl>
        </div>

        <div>
          <CaseSteps item={featured} lang={lang} />
          <Link
            href={`/${lang}/cases/${featured.slug}`}
            className="mt-8 inline-block border-b border-ink pb-0.5 text-[15px] hover:border-transparent"
          >
            {t(caseCopy.readCase, lang)}
          </Link>
        </div>
      </article>

      <ul className="grid md:grid-cols-12">
        {rest.map((item, i) => (
          <li
            key={item.slug}
            className={
              i === 0
                ? "border-b border-rule py-10 md:col-span-7 md:border-r md:pr-10"
                : i === 1
                  ? "border-b border-rule py-10 md:col-span-5 md:pl-10"
                  : "border-b border-rule py-10 md:col-span-12 md:grid md:grid-cols-[5fr_7fr] md:gap-14"
            }
          >
            <div>
              <p className="font-mono text-xs text-ink-muted">{item.tags.join(" / ")}</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                <Link
                  href={`/${lang}/cases/${item.slug}`}
                  className="decoration-1 underline-offset-[6px] hover:underline"
                >
                  {t(item.title, lang)}
                </Link>
              </h3>
            </div>
            <p className="mt-4 max-w-[52ch] text-ink-muted md:mt-3">
              {t(item.context, lang)} <span className="text-ink">{t(item.result, lang)}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
