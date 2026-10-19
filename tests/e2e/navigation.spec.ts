import { test, expect } from "./fixtures";

test.describe("navigation", () => {
  test("root redirects to the visitor's language", async ({ browser, baseURL }) => {
    for (const [locale, lang] of [
      ["es-VE", "es"],
      ["en-US", "en"],
      ["fr-FR", "en"],
    ]) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      await page.goto(baseURL!);
      await expect(page).toHaveURL(new RegExp(`/${lang}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await context.close();
    }
  });

  for (const [label, id] of [
    ["Work", "work"],
    ["Cases", "cases"],
    ["Stack", "stack"],
    ["Contact", "contact"],
  ] as const) {
    test(`"${label}" scrolls to its section`, async ({ portfolio, page }) => {
      await portfolio.goto("en");
      await (await portfolio.navLink(label)).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(portfolio.section(id)).toBeInViewport();
    });
  }

  test("mobile menu closes with Escape and returns focus", async ({ portfolio, isMobile }) => {
    test.skip(!isMobile, "The menu button only exists on small screens");
    await portfolio.goto("en");
    await portfolio.menuButton.click();
    await expect(portfolio.mobileMenu).toBeVisible();
    await expect(portfolio.menuButton).toHaveAttribute("aria-expanded", "true");
    await portfolio.page.keyboard.press("Escape");
    await expect(portfolio.mobileMenu).toBeHidden();
    await expect(portfolio.menuButton).toBeFocused();
  });

  test("skip link is the first stop for keyboard users", async ({ portfolio, page, isMobile }) => {
    test.skip(isMobile, "Keyboard navigation is a desktop scenario");
    await portfolio.goto("en");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("case study opens its own page and links to the next one", async ({ portfolio, page }) => {
    await portfolio.goto("en", "#cases");
    await portfolio
      .section("cases")
      .getByRole("link", { name: "The 10M emails that weren't" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/en\/cases\/false-10m-email-spike$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("The 10M emails that weren't");
    await page.getByRole("navigation", { name: "Next case" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/en\/cases\/conversations-module$/);
  });

  test("unknown case shows the not-found page and is not indexed", async ({ page }) => {
    await page.goto("/en/cases/does-not-exist");
    await expect(page.getByText("could not be found")).toBeVisible();
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
  });
});
