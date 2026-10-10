import type { Locale, Profile } from "@/content/profile";
import { t } from "@/lib/i18n";

export const caseCopy = {
  section: { en: "Case studies", es: "Casos" },
  context: { en: "Context", es: "Contexto" },
  did: { en: "What I did", es: "Qué hice" },
  result: { en: "Result", es: "Resultado" },
  readCase: { en: "Read the case", es: "Leer el caso" },
  allCases: { en: "All cases", es: "Todos los casos" },
  nextCase: { en: "Next case", es: "Siguiente caso" },
};

/** Context → What I did → Result, as a definition list. */
export function CaseSteps({
  item,
  lang,
  size = "base",
}: {
  item: Profile["cases"][number];
  lang: Locale;
  size?: "base" | "lg";
}) {
  const steps = [
    { label: caseCopy.context, body: item.context },
    { label: caseCopy.did, body: item.did },
    { label: caseCopy.result, body: item.result },
  ];

  return (
    <dl className="grid gap-6">
      {steps.map((step, i) => (
        <div key={i} className="grid gap-1.5 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <dt className="pt-1 font-mono text-xs text-ink-muted">
            {i === 2 ? <span className="text-pass">✓ </span> : null}
            {t(step.label, lang)}
          </dt>
          <dd className={size === "lg" ? "text-xl leading-relaxed" : "text-lg leading-relaxed"}>
            {t(step.body, lang)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
