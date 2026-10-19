import { test, expect } from "./fixtures";

const EMAIL = "victor.maniglia.dev@gmail.com";

test.describe("contact", () => {
  test("copy button puts the email on the clipboard", async ({
    portfolio,
    page,
    context,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Clipboard permissions are Chromium-only in Playwright");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await portfolio.goto("en", "#contact");
    await portfolio.copyEmail.click();
    await expect(portfolio.copyEmail).toHaveAttribute("data-status", "copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
    await expect(portfolio.copyEmail).toHaveAttribute("data-status", "idle", { timeout: 4000 });
  });

  test("email link opens the mail client", async ({ portfolio }) => {
    await portfolio.goto("en", "#contact");
    await expect(portfolio.contactEmail).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  test("invalid submit flags the fields and keeps what was typed", async ({ portfolio, page }) => {
    await portfolio.goto("en", "#contact");
    await portfolio.fillContact({ name: "QA Bot", email: "not-an-email", message: "Short" });
    await page.waitForTimeout(3100); // stay above the anti-bot minimum fill time
    await portfolio.contactForm.getByRole("button", { name: "Send message" }).click();

    await expect(portfolio.contactForm.getByText("Check the highlighted fields")).toBeVisible();
    await expect(portfolio.field("email")).toHaveAttribute("aria-invalid", "true");
    await expect(portfolio.field("message")).toHaveAttribute("aria-invalid", "true");
    await expect(portfolio.field("name")).toHaveAttribute("aria-invalid", "false");
    await expect(portfolio.field("name")).toHaveValue("QA Bot");
    await expect(portfolio.field("message")).toHaveValue("Short");
  });

  test("when sending fails, the visitor gets the email address instead", async ({
    portfolio,
    page,
  }) => {
    test.skip(!!process.env.RESEND_API_KEY, "Would send a real email");
    await portfolio.goto("es", "#contact");
    await portfolio.fillContact({
      name: "QA Bot",
      email: "qa.bot@example.com",
      message: "Mensaje de prueba automatizada.",
    });
    await page.waitForTimeout(3100);
    await portfolio.contactForm.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(portfolio.contactForm.getByText("El mensaje no se pudo enviar")).toBeVisible();
    await expect(portfolio.contactForm.getByRole("link", { name: EMAIL })).toHaveAttribute(
      "href",
      `mailto:${EMAIL}`,
    );
    await expect(portfolio.field("message")).toHaveValue("Mensaje de prueba automatizada.");
  });
});
