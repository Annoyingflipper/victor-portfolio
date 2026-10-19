import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";

const pages = ["/en", "/es", "/en/cases/false-10m-email-spike", "/es/cases/agentic-qa"];

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const scheme of ["light", "dark"] as const) {
    for (const path of pages) {
      test(`${path} in ${scheme} mode has no serious violations`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const serious = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        );
        expect(
          serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
        ).toEqual([]);
      });
    }
  }
});
