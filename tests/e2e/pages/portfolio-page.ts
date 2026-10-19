import { expect, type Locator, type Page } from "@playwright/test";

export type Lang = "en" | "es";

/** Page object for the one-page portfolio (/en, /es). */
export class PortfolioPage {
  readonly header: Locator;
  readonly themeToggle: Locator;
  readonly languageLink: Locator;
  readonly menuButton: Locator;
  readonly mobileMenu: Locator;
  readonly heroCv: Locator;
  readonly runLine: Locator;
  readonly copyEmail: Locator;
  readonly contactEmail: Locator;
  readonly contactForm: Locator;
  readonly footerRun: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator("header").filter({ visible: true }).first();
    this.themeToggle = page.getByTestId("theme-toggle").filter({ visible: true });
    this.languageLink = this.header.locator("a[hreflang]");
    this.menuButton = page.locator("button[aria-controls='mobile-menu']");
    this.mobileMenu = page.locator("#mobile-menu");
    this.heroCv = page
      .locator("section[aria-labelledby='hero-name'] a[download]")
      .filter({ visible: true });
    this.runLine = page.getByTestId("run-line").filter({ visible: true });
    this.copyEmail = page.getByTestId("copy-email").filter({ visible: true });
    this.contactEmail = page.getByTestId("contact-email").filter({ visible: true });
    this.contactForm = page.getByTestId("contact-form").filter({ visible: true });
    this.footerRun = page.getByTestId("footer-run").filter({ visible: true });
  }

  async goto(lang: Lang = "en", hash = "") {
    await this.page.goto(`/${lang}${hash}`);
    await expect(this.page.getByRole("heading", { level: 1 })).toBeVisible();
  }

  section(id: "work" | "cases" | "projects" | "process" | "stack" | "contact") {
    return this.page.locator(`section[aria-labelledby='${id}']`).filter({ visible: true });
  }

  /** Opens the mobile menu when the viewport hides the desktop links. */
  async navLink(name: string) {
    if (await this.menuButton.isVisible()) {
      await this.menuButton.click();
      return this.mobileMenu.getByRole("link", { name, exact: true });
    }
    return this.header
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name, exact: true });
  }

  field(name: "name" | "email" | "message") {
    return this.contactForm.locator(`[name='${name}']`);
  }

  async fillContact(values: { name: string; email: string; message: string }) {
    await this.field("name").fill(values.name);
    await this.field("email").fill(values.email);
    await this.field("message").fill(values.message);
  }

  async hasHorizontalScroll() {
    return this.page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  }
}
