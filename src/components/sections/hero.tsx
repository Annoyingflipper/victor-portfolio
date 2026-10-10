import Image from "next/image";
import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { t } from "@/lib/i18n";
import photo from "../../../public/images/victor.jpg";

export function Hero({ lang }: { lang: Locale }) {
  return (
    <section
      aria-labelledby="hero-name"
      className="grid gap-10 pt-12 pb-16 md:grid-cols-[7fr_4fr] md:items-end md:gap-14 md:pt-20 md:pb-20"
    >
      <div className="order-2 md:order-1">
        <p className="mb-8 flex items-center gap-2.5 font-mono text-[13px] text-ink-muted">
          <span className="size-2 rounded-full bg-pass" aria-hidden="true" />
          {t(profile.availability, lang)}
        </p>

        <h1
          id="hero-name"
          className="font-serif text-[clamp(4rem,10.5vw,9.5rem)] leading-[0.86] tracking-[-0.025em]"
        >
          Victor
          <br />
          Maniglia
        </h1>
        <p className="mt-4 mb-8 font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-ink-muted italic">
          {t(profile.role, lang)}
        </p>

        <p className="max-w-[34ch] text-lg leading-relaxed sm:text-xl">
          {t(profile.positioning, lang)}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={profile.contact.cv}
            download
            className="inline-flex border border-ink bg-ink px-5 py-3 text-[15px] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            {ui.downloadCv[lang]}
          </a>
          <a
            href="#contact"
            className="inline-flex border border-ink px-5 py-3 text-[15px] transition-colors hover:bg-ink hover:text-paper"
          >
            {ui.getInTouch[lang]}
          </a>
        </div>

        <p
          className="mt-10 border-t border-rule pt-4 font-mono text-sm text-ink-muted"
          data-testid="run-line"
        >
          <span className="text-pass">✓ passed</span>
          <span className="ml-3">{t(profile.runLine, lang)}</span>
        </p>
      </div>

      <figure className="order-1 w-3/5 max-w-sm md:order-2 md:w-full md:max-w-none">
        <Image
          src={photo}
          alt={t(profile.photo.alt, lang)}
          priority
          placeholder="blur"
          sizes="(min-width: 768px) 33vw, 60vw"
          className="aspect-[3/4] w-full object-cover object-[60%_30%] mix-blend-multiply contrast-[1.05] grayscale dark:opacity-85 dark:mix-blend-normal"
        />
        <figcaption className="mt-2.5 flex justify-between font-mono text-xs text-ink-muted">
          <span>{t(profile.location, lang)}</span>
          <span>fig. 1</span>
        </figcaption>
      </figure>
    </section>
  );
}
