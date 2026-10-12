import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { formatMonth, t } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

const copy = {
  section: { en: "Work", es: "Experiencia" },
  present: { en: "Present", es: "Actual" },
  education: { en: "Education", es: "Educación" },
};

export function Experience({ lang, index }: { lang: Locale; index: number }) {
  const { education } = profile;

  return (
    <section aria-labelledby="work" className="scroll-mt-24 py-16 md:py-24">
      <SectionHeading id="work" index={index} title={t(copy.section, lang)} />

      <div className="mt-12 grid gap-14 md:grid-cols-[3fr_8fr] md:gap-14">
        <aside className="order-2 md:order-1">
          <h3 className="font-mono text-xs text-ink-muted">{t(copy.education, lang)}</h3>
          <p className="mt-3 font-serif text-2xl leading-tight">{t(education.degree, lang)}</p>
          <p className="mt-1 text-ink-muted">
            {education.school} · <span className="font-mono text-sm">{education.years}</span>
          </p>
          <ul className="mt-6 space-y-1.5 border-t border-rule pt-4 font-mono text-[13px] text-ink-muted">
            {education.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </aside>

        <Timeline className="order-1 md:order-2">
          {profile.experience.map((job) => {
            const current = job.end === null;
            const secondary = "secondary" in job && job.secondary;
            return (
              <TimelineItem key={job.company}>
                <TimelineDot state={current && !secondary ? "current" : "past"} />
                <TimelineContent>
                  <TimelineTime>
                    <time dateTime={job.start}>{formatMonth(job.start, lang)}</time>
                    {" – "}
                    {job.end ? (
                      <time dateTime={job.end}>{formatMonth(job.end, lang)}</time>
                    ) : (
                      t(copy.present, lang)
                    )}
                  </TimelineTime>
                  <TimelineTitle className={secondary ? "text-2xl md:text-2xl" : undefined}>
                    {t(job.role, lang)}
                    <span className="text-ink-muted"> · {job.company}</span>
                  </TimelineTitle>
                  <TimelineDescription>{t(job.context, lang)}</TimelineDescription>
                  {job.highlights.length > 0 && (
                    <ul className="mt-5 grid max-w-[64ch] gap-3">
                      {job.highlights.map((h, i) => (
                        <li key={i} className="grid grid-cols-[1rem_1fr] gap-2 leading-relaxed">
                          <span className="font-mono text-sm text-ink-muted" aria-hidden="true">
                            –
                          </span>
                          <span>{t(h, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
}
