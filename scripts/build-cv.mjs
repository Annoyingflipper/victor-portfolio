// Renders cv/cv.html to public/Victor-Maniglia-CV.pdf and fails if it is not exactly one page.
import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = `${root}public/Victor-Maniglia-CV.pdf`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(`${root}cv/cv.html`).href);
await page.pdf({ path: out, format: "Letter", preferCSSPageSize: true, printBackground: true });
await browser.close();

const pages = (readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`CV written to public/Victor-Maniglia-CV.pdf (${pages} page${pages === 1 ? "" : "s"})`);
if (pages !== 1) process.exit(1);
