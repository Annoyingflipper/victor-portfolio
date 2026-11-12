import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";

const copy = {
  section: { en: "Projects", es: "Proyectos" },
  empty: {
    en: "Side projects will land here. The slot is reserved.",
    es: "Aquí van a ir mis proyectos personales. El espacio ya está reservado.",
  },
  view: { en: "View on GitHub", es: "Ver en GitHub" },
};

/** Personal projects from profile.ts. While the list is empty it shows a reserved slot. */
export function Projects({ lang, index }: { lang: Locale; index: number }) {
  const { projects } = profile;

  return (
    <section aria-labelledby="projects" className="scroll-mt-24 py-16 md:py-20">
      <SectionHeading id="projects" index={index} title={t(copy.section, lang)} />

      {projects.length === 0 ? (
        <div className="mt-10 border border-dashed border-rule px-5 py-6">
          <p className="font-sans text-base text-ink-muted">{t(copy.empty, lang)}</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.url} className="border-b border-rule py-6">
              <p className="font-mono text-xs text-ink-muted">{p.tags.join(" / ")}</p>
              <h3 className="mt-2 font-serif text-3xl">{p.name}</h3>
              <p className="mt-2 text-ink-muted">{t(p.description, lang)}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block border-b border-ink pb-0.5 text-[15px] hover:border-transparent"
              >
                {t(copy.view, lang)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
