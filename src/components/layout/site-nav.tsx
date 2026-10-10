"use client";

/**
 * Floating site navigation.
 * Based on "Navbar 1" by Preet Suthar (HextaUI, MIT) from 21st.dev:
 * https://21st.dev/@preetsuthar17/components/navbar-1
 * Reworked for this site: palette and type tokens, real links, language and theme
 * switches, CV download, and an accessible mobile menu (Escape, focus, aria-expanded).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#work", label: ui.nav.work },
  { href: "#cases", label: ui.nav.cases },
  { href: "#stack", label: ui.nav.stack },
  { href: "#contact", label: ui.nav.contact },
];

export function SiteNav({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const other: Locale = lang === "en" ? "es" : "en";

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border border-rule bg-paper/85 px-4 py-2.5 backdrop-blur-md sm:px-5">
        <Link
          href={`/${lang}`}
          className="font-serif text-2xl leading-none tracking-tight"
          aria-label={profile.name}
        >
          V. Maniglia
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] decoration-1 underline-offset-[6px] hover:underline"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${other}`}
            hrefLang={other}
            lang={other}
            className="px-1 font-mono text-xs text-ink-muted uppercase hover:text-ink"
            aria-label={ui.languageToggle[lang]}
          >
            {other}
          </Link>
          <ThemeToggle label={ui.themeToggle[lang]} />
          <a
            href={profile.contact.cv}
            download
            className="hidden border border-ink px-4 py-2 text-sm transition-colors hover:bg-ink hover:text-paper md:inline-flex"
          >
            {ui.downloadCv[lang]}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid size-9 place-items-center md:hidden"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-paper px-4 pt-6 pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <span className="font-serif text-2xl leading-none">V. Maniglia</span>
              <button
                type="button"
                className="grid size-9 place-items-center"
                onClick={() => {
                  close();
                  menuButton.current?.focus();
                }}
                aria-label="Close menu"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-8 flex flex-col">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="flex items-baseline gap-4 border-b border-rule py-4 font-serif text-4xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                  {link.label[lang]}
                </motion.a>
              ))}
            </nav>
            <a
              href={profile.contact.cv}
              download
              className="mt-auto inline-flex justify-center bg-ink px-5 py-3 text-paper"
            >
              {ui.downloadCv[lang]}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
