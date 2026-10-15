import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "screenshots");
const suppliedUrl = process.argv.find((argument) => argument.startsWith("--url="))?.slice(6);
const baseUrl = suppliedUrl ?? "http://127.0.0.1:4179";
const server = suppliedUrl ? null : spawn(process.execPath, [
  resolve(root, "node_modules/vite/bin/vite.js"), "--host", "127.0.0.1", "--port", "4179", "--strictPort",
], { cwd: root, stdio: "ignore", windowsHide: true });

async function waitForServer(url) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch { /* Vite is still starting. */ }
    await new Promise((done) => setTimeout(done, 250));
  }
  throw new Error("Servidor não respondeu em " + url + ".");
}

let browser;
try {
  await waitForServer(baseUrl);
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();
  const page = await browser.newPage();
  const sizes = [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ];
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  for (const size of sizes) {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.waitForTimeout(120);
    const cards = page.locator("[data-component]");
    for (let index = 0; index < await cards.count(); index += 1) {
      const card = cards.nth(index);
      await card.scrollIntoViewIfNeeded();
      const id = await card.getAttribute("data-component");
      await card.screenshot({ path: resolve(output, id + "--" + size.name + ".png"), animations: "disabled" });
    }
  }
  process.stdout.write("Capturas salvas em " + output + " (4 componentes × 3 resoluções).\n");
} catch (error) {
  process.stderr.write((error instanceof Error ? error.message : String(error)) + "\n");
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) {
    server.kill();
    if (server.exitCode === null) await new Promise((done) => server.once("exit", done));
  }
}

