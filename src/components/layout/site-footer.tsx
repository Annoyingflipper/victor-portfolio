import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { t } from "@/lib/i18n";

const copy = {
  lastRun: { en: "Last run", es: "Última ejecución" },
  passing: { en: "all checks passing", es: "todas las pruebas pasan" },
};

export function SiteFooter({ lang }: { lang: Locale }) {
  const date = process.env.NEXT_PUBLIC_BUILD_DATE;

  return (
    <footer className="mx-auto mt-8 max-w-6xl px-4 pb-10 sm:px-6 lg:px-5">
      <div className="flex flex-col gap-4 border-t border-ink pt-5 font-mono text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-run">
          {t(copy.lastRun, lang)}: <time dateTime={date}>{date}</time> ·{" "}
          <span className="text-pass">✓ {t(copy.passing, lang)}</span>
        </p>
        <p>
          © {date?.slice(0, 4)} {profile.name}
        </p>
      </div>
    </footer>
  );
}
