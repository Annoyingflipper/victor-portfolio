import { locales, type Locale, type T } from "@/content/profile";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Resolve a bilingual string for the current locale. */
export const t = (text: T, locale: Locale) => text[locale];

const months: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};

/** "2024-02" → "Feb 2024" / "feb 2024". Deterministic, so server and client agree. */
export function formatMonth(ym: string, locale: Locale) {
  const [year, month] = ym.split("-").map(Number);
  return `${months[locale][month - 1]} ${year}`;
}
