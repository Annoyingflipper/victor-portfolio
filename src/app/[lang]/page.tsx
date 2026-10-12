import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { SiteNav } from "@/components/layout/site-nav";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Experience } from "@/components/sections/experience";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {ui.skipToContent[lang]}
      </a>
      <SiteNav lang={lang} />
      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-5">
        <Hero lang={lang} />
        <Metrics lang={lang} />
        <Experience lang={lang} index={1} />
        <Cases lang={lang} index={2} />
        {/* 03 How I test, 04 Stack */}
        <Contact lang={lang} index={5} />
      </main>
    </>
  );
}
