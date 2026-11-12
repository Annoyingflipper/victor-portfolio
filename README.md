# victor-portfolio

[![CI](https://github.com/Annoyingflipper/victor-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Annoyingflipper/victor-portfolio/actions/workflows/ci.yml)

Portfolio and live CV of **Victor Maniglia**, QA Automation Engineer.
The site is built like a passing test run, so it is tested like one: every push runs lint, a type check, a production build and an end-to-end suite with accessibility checks.

- **Live:** _added after the first Vercel deploy_
- **Languages:** English (`/en`) and Spanish (`/es`), picked from the browser's language on first visit

## Stack

| Area          | Tools                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Cache Components), React 19, TypeScript                                                                                                   |
| Styling       | Tailwind CSS 4, shadcn/ui tokens, `next/font` (Instrument Serif, Geist, Geist Mono)                                                                               |
| UI components | Adapted from [21st.dev](https://21st.dev): Navbar 1 (HextaUI), Timeline (Hirael), Copy Button and Logo Marquee (interior.dev). All MIT; credits are in each file. |
| Motion        | `motion`, loaded only where it is used (copy button); everything else is CSS                                                                                      |
| Contact form  | Server Action + [Resend](https://resend.com), validated with Zod, honeypot and minimum fill time against bots                                                     |
| Testing       | Playwright (Page Object Model + fixtures), `@axe-core/playwright`                                                                                                 |
| CI            | GitHub Actions                                                                                                                                                    |
| Hosting       | Vercel (production on `main`, a preview per pull request)                                                                                                         |

## Project structure

```
src/
  content/profile.ts    ← every fact and sentence on the site (EN + ES). Edit this file.
  content/ui.ts         ← interface labels (nav, buttons)
  app/[lang]/           ← pages: home, /cases/[slug], Open Graph image
  app/actions/          ← contact form Server Action
  components/sections/  ← one file per page section
  components/ui/        ← components adapted from 21st.dev
cv/cv.html              ← source of the downloadable CV
public/Victor-Maniglia-CV.pdf
tests/e2e/              ← Playwright specs, page object and fixtures
```

## Run it locally

```bash
npm install
npm run dev            # http://localhost:3000
```

## Tests

The suite runs against a production build, on a desktop and a mobile (Pixel 7) project.

```bash
npx playwright install chromium   # first time only
npm run build
npm run test:e2e                  # starts `next start` on :3100 automatically
npx playwright show-report        # HTML report
```

Run the same suite against a deployed URL:

```bash
BASE_URL=https://your-preview.vercel.app npm run test:e2e
```

What the suite covers:

| Spec                 | Checks                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigation`         | language redirect from `/`, section links (desktop and mobile menu), Escape closes the menu and returns focus, skip link, case pages and "next case", unknown case is `noindex` |
| `cv`                 | download filename, PDF content type, exactly one page, all CV links point to one file                                                                                           |
| `contact`            | copy-email writes the clipboard and resets, `mailto:` link, invalid submit flags fields and keeps the text, failed send shows the email instead                                 |
| `theme-and-language` | theme toggle persists after reload, first visit follows the OS setting, EN ⇄ ES switch                                                                                          |
| `links-and-layout`   | LinkedIn/GitHub targets and `rel=noopener`, no phone or address published, no horizontal scroll from 360 to 1920 px, footer build date                                          |
| `a11y`               | axe (WCAG 2.2 AA) on four pages in light and dark mode; fails on any serious or critical violation                                                                              |
| `seo`                | title, description, canonical, hreflang, 1200×630 Open Graph PNG, `Person` JSON-LD, sitemap and robots                                                                          |

Open the browser console on the live site for one more small test report.

## Quality scripts

```bash
npm run lint
npm run typecheck
npm run format:check
npm run cv             # rebuild the CV PDF from cv/cv.html; fails if it is not one page
```

## Environment variables

See `.env.example`. Only the contact form needs them:

| Variable               | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key (set in Vercel, never committed)    |
| `CONTACT_TO_EMAIL`     | Inbox that receives form messages                  |
| `CONTACT_FROM_EMAIL`   | Sender, defaults to `onboarding@resend.dev`        |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical URL once a custom domain exists |

## Editing the content

1. Change the text or numbers in `src/content/profile.ts` (each sentence has `en` and `es`).
2. Run `npm run build && npm run test:e2e` to check nothing broke.
3. Push to `main`. Vercel deploys it.

To add a side project, push an entry to `projects` in the same file. The empty "Projects" state disappears on its own.
