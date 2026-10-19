import { test, expect } from "./fixtures";

test.describe("CV download", () => {
  test("hero button downloads the PDF", async ({ portfolio, page }) => {
    await portfolio.goto("en");
    const [download] = await Promise.all([page.waitForEvent("download"), portfolio.heroCv.click()]);
    expect(download.suggestedFilename()).toBe("Victor-Maniglia-CV.pdf");
  });

  test("the PDF is served as a one-page PDF", async ({ request }) => {
    const response = await request.get("/Victor-Maniglia-CV.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    const body = (await response.body()).toString("latin1");
    expect(body.startsWith("%PDF")).toBe(true);
    expect(body.match(/\/Type\s*\/Page[^s]/g)).toHaveLength(1);
  });

  test("every Download CV link points to the same file", async ({ portfolio, page }) => {
    await portfolio.goto("es");
    const hrefs = await page
      .locator("a[download]")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    expect(new Set(hrefs)).toEqual(new Set(["/Victor-Maniglia-CV.pdf"]));
  });
});
