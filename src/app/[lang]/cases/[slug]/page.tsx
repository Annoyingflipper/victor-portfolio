import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, profile } from "@/content/profile";
import { hasLocale, t } from "@/lib/i18n";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { caseCopy, CaseSteps } from "@/components/case-steps";

export function generateStaticParams() {
  return locales.flatMap((lang) => profile.cases.map((c) => ({ lang, slug: c.slug })));
}

const findCase = (slug: string) => profile.cases.findIndex((c) => c.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/cases/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const i = findCase(slug);
  if (!hasLocale(lang) || i < 0) return {};
  const item = profile.cases[i];
  return {
    title: `${t(item.title, lang)} · ${profile.name}`,
    description: t(item.context, lang),
    alternates: {
      canonical: `/${lang}/cases/${slug}`,
      languages: { en: `/en/cases/${slug}`, es: `/es/cases/${slug}` },
    },
  };
}

export default async function CasePage({ params }: PageProps<"/[lang]/cases/[slug]">) {
  const { lang, slug } = await params;
  const i = findCase(slug);
  if (!hasLocale(lang) || i < 0) notFound();

  const item = profile.cases[i];
  const next = profile.cases[(i + 1) % profile.cases.length];

  return (
    <>
      <SiteNav lang={lang} />
      <main id="main" className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 md:pt-20 lg:px-5">
        <Link href={`/${lang}#cases`} className="font-mono text-sm text-ink-muted hover:text-ink">
          ← {t(caseCopy.allCases, lang)}
        </Link>

        <article className="mt-10 grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <header>
            <p className="font-mono text-xs text-ink-muted">
              {String(i + 1).padStart(2, "0")} / {String(profile.cases.length).padStart(2, "0")}
              <span className="mx-2">·</span>
              {item.tags.join(" / ")}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight">
              {t(item.title, lang)}
            </h1>
          </header>
          <div className="md:pt-8">
            <CaseSteps item={item} lang={lang} size="lg" />
          </div>
        </article>

        <nav aria-label={t(caseCopy.nextCase, lang)} className="mt-20 border-t border-ink pt-6">
          <p className="font-mono text-xs text-ink-muted">{t(caseCopy.nextCase, lang)}</p>
          <Link
            href={`/${lang}/cases/${next.slug}`}
            className="mt-2 inline-block font-serif text-3xl decoration-1 underline-offset-[6px] hover:underline md:text-4xl"
          >
            {t(next.title, lang)}
          </Link>
        </nav>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
