"use client";

import { useEffect } from "react";
import { profile } from "@/content/profile";

/**
 * Easter egg: prints a small test report of this page to the browser console.
 * Every check runs for real against the live DOM, so the report can fail.
 */
export function ConsoleReport() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const external = [...document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')];
      const checks: [string, boolean][] = [
        ["page has exactly one h1", document.querySelectorAll("h1").length === 1],
        ["every image has alt text", [...document.images].every((img) => img.alt.trim() !== "")],
        ["no horizontal scroll", document.documentElement.scrollWidth <= window.innerWidth],
        ["external links use rel=noopener", external.every((a) => a.rel.includes("noopener"))],
        ["CV link is present", !!document.querySelector(`a[href="${profile.contact.cv}"]`)],
      ];
      const passed = checks.filter(([, ok]) => ok).length;
      const green = "color:#4fb06d",
        red = "color:#c9695b",
        dim = "color:#8f897d";

      console.log("%cRunning %d checks on %s", dim, checks.length, location.host);
      for (const [name, ok] of checks) {
        console.log(`%c  ${ok ? "✓" : "✗"} %c${name}`, ok ? green : red, "color:inherit");
      }
      console.log(
        `%c\n  ${passed} passed%c · ${checks.length - passed} failed · built ${process.env.NEXT_PUBLIC_BUILD_DATE}`,
        passed === checks.length ? green : red,
        dim,
      );
      console.log(`%c\nFound a bug anyway? Tell me: ${profile.contact.email}`, dim);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
