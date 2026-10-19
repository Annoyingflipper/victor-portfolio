import { test, expect } from "./fixtures";

test.describe("external links", () => {
  test("LinkedIn and GitHub point to Victor's profiles and open safely", async ({ portfolio }) => {
    await portfolio.goto("en", "#contact");
    const contact = portfolio.section("contact");
    for (const [name, href] of [
      ["LinkedIn", "https://linkedin.com/in/victormaniglia"],
      ["GitHub", "https://github.com/Annoyingflipper"],
    ]) {
      const link = contact.getByRole("link", { name: new RegExp(`^${name}`) });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("no phone number or street address is published", async ({ portfolio, page }) => {
    await portfolio.goto("en");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\+58|424|Lagunita|Hatillo/);
  });
});

test.describe("layout", () => {
  for (const width of [360, 768, 1024, 1440, 1920]) {
    test(`no horizontal scroll at ${width}px`, async ({ portfolio, page, isMobile }) => {
      test.skip(isMobile, "Widths are set explicitly; one project is enough");
      await page.setViewportSize({ width, height: 900 });
      for (const lang of ["en", "es"] as const) {
        await portfolio.goto(lang);
        expect(await portfolio.hasHorizontalScroll(), `${lang} at ${width}px`).toBe(false);
      }
    });
  }

  test("footer reports the build date and passing checks", async ({ portfolio }) => {
    await portfolio.goto("en");
    await expect(portfolio.footerRun).toContainText(/Last run: \d{4}-\d{2}-\d{2}/);
    await expect(portfolio.footerRun).toContainText("all checks passing");
  });
});
