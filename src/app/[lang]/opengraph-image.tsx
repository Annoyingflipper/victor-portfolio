import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { locales, profile } from "@/content/profile";
import { hasLocale, t } from "@/lib/i18n";

export const alt = `${profile.name}, QA Automation Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Share card in the site's style: paper, ink, one green "passed". */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const [serif, serifItalic, mono] = await Promise.all([
    font("instrument-serif", "instrument-serif-latin-400-normal.woff"),
    font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
    font("geist-mono", "geist-mono-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f3f0e8",
        color: "#151515",
        padding: "64px 72px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Mono",
          fontSize: 22,
          color: "#6b665c",
        }}
      >
        <span>{t(profile.location, lang)}</span>
        <span>{t(profile.availability, lang).split(" · ")[0]}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "Serif", fontSize: 150, lineHeight: 0.9, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div
          style={{
            fontFamily: "Serif",
            fontStyle: "italic",
            fontSize: 58,
            color: "#6b665c",
            marginTop: 18,
          }}
        >
          {t(profile.role, lang)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #d6d0c2",
          paddingTop: 24,
          fontFamily: "Mono",
          fontSize: 26,
          color: "#6b665c",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", color: "#24703b", marginRight: 20 }}>
          <svg width="22" height="22" viewBox="0 0 14 14" style={{ marginRight: 10 }}>
            <path d="M2.9 7.4 5.6 10.1 11.1 4" fill="none" stroke="#24703b" strokeWidth="1.6" />
          </svg>
          passed
        </span>
        <span>{t(profile.runLine, lang)}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
