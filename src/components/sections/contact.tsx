import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";

const copy = {
  section: { en: "Contact", es: "Contacto" },
  title: {
    en: "Hiring for QA or test automation? Tell me about the role.",
    es: "¿Buscas a alguien para QA o automatización de pruebas? Cuéntame del rol.",
  },
  orWrite: { en: "Or write to me here:", es: "O escríbeme aquí:" },
};

export function Contact({ lang, index }: { lang: Locale; index: number }) {
  const links = [
    { label: "LinkedIn", href: profile.contact.linkedin, external: true },
    { label: "GitHub", href: profile.contact.github, external: true },
    { label: ui.downloadCv[lang], href: profile.contact.cv, download: true },
  ];

  return (
    <section aria-labelledby="contact" className="scroll-mt-24 py-16 md:py-24">
      <SectionHeading id="contact" index={index} title={t(copy.section, lang)} />

      <div className="mt-10 grid gap-14 md:grid-cols-[5fr_6fr] md:gap-16">
        <div>
          <p className="max-w-[18ch] font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-tight">
            {t(copy.title, lang)}
          </p>

          <a
            href={`mailto:${profile.contact.email}`}
            className="mt-10 inline-block font-mono text-[15px] break-all underline decoration-rule decoration-1 underline-offset-[6px] hover:decoration-ink sm:text-base"
            data-testid="contact-email"
          >
            {profile.contact.email}
          </a>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(link.download ? { download: true } : {})}
                  className="border-b border-ink pb-0.5 hover:border-transparent"
                >
                  {link.label}
                  {link.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-6 text-ink-muted">{t(copy.orWrite, lang)}</p>
          <ContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
