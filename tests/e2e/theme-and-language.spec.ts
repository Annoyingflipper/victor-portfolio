import { test, expect } from "./fixtures";

test.describe("theme", () => {
  test("toggle switches theme and remembers it after reload", async ({ portfolio, page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await portfolio.goto("en");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await portfolio.themeToggle.click();
    await expect(html).toHaveClass(/dark/);
    await expect(portfolio.themeToggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });

  test("follows the system setting on first visit", async ({ portfolio, page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await portfolio.goto("es");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("language", () => {
  test("switches between English and Spanish", async ({ portfolio, page }) => {
    await portfolio.goto("en");
    await expect(portfolio.runLine).toContainText("300+ tests");
    await portfolio.languageLink.click();

    await expect(page).toHaveURL(/\/es$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(portfolio.runLine).toContainText("300+ pruebas");
    await expect(portfolio.section("work").getByRole("heading", { level: 2 })).toContainText(
      "Experiencia",
    );
  });
});
