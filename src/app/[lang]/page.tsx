import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { SiteNav } from "@/components/layout/site-nav";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Experience } from "@/components/sections/experience";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { Stack } from "@/components/sections/stack";
import { BeyondQa } from "@/components/sections/beyond-qa";
import { SiteFooter } from "@/components/layout/site-footer";
import { ConsoleReport } from "@/components/layout/console-report";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t(profile.role, lang),
    url: `${siteUrl}/${lang}`,
    image: `${siteUrl}${profile.photo.src}`,
    email: `mailto:${profile.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Caracas", addressCountry: "VE" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
    worksFor: { "@type": "Organization", name: "DANAconnect" },
    knowsLanguage: ["en", "es"],
    knowsAbout: profile.stack.flatMap((g) => g.items),
    sameAs: [profile.contact.linkedin, profile.contact.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
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
        <Projects lang={lang} index={3} />
        <Process lang={lang} index={4} />
        <Stack lang={lang} index={5} />
        <BeyondQa lang={lang} />
        <Contact lang={lang} index={6} />
      </main>
      <SiteFooter lang={lang} />
      <ConsoleReport />
    </>
  );
}
