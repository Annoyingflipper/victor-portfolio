import { test, expect } from "./fixtures";

test.describe("SEO", () => {
  test("home has title, description, canonical and hreflang", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle("Victor Maniglia · QA Automation Engineer");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /what breaks/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en$/);
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
      "href",
      /\/es$/,
    );
  });

  test("Open Graph image is a 1200x630 PNG", async ({ page, request }) => {
    await page.goto("/es");
    const url = await page.locator('meta[property="og:image"]').getAttribute("content");
    const response = await request.get(new URL(url!).pathname + new URL(url!).search);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      "content",
      "1200",
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      "content",
      "630",
    );
  });

  test("JSON-LD describes a Person", async ({ page }) => {
    await page.goto("/en");
    const json = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    );
    expect(json["@type"]).toBe("Person");
    expect(json.name).toBe("Victor Maniglia");
    expect(json.sameAs).toContain("https://github.com/Annoyingflipper");
  });

  test("sitemap lists every page in both languages and robots points to it", async ({
    request,
  }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap.match(/<loc>/g)).toHaveLength(10);
    for (const path of ["/en", "/es", "/en/cases/agentic-qa", "/es/cases/chatbot-automation"]) {
      expect(sitemap).toContain(`${path}</loc>`);
    }
    expect(await (await request.get("/robots.txt")).text()).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });
});
