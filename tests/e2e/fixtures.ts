import { test as base, expect } from "@playwright/test";
import { PortfolioPage } from "./pages/portfolio-page";

/** Every spec gets a ready PortfolioPage and runs with reduced motion, so animations never race assertions. */
export const test = base.extend<{ portfolio: PortfolioPage }>({
  portfolio: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(new PortfolioPage(page));
  },
});

export { expect };
