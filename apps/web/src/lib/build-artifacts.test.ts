import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { REPO_BASE_PATH } from "@/lib/pages-config";

const OUT_DIR = path.join(process.cwd(), "out");

describe("GitHub Pages build artifacts", () => {
  it("includes required static export files when out/ exists", () => {
    if (!existsSync(OUT_DIR)) {
      // Local dev / CI unit job may run without a prior build.
      expect(true).toBe(true);
      return;
    }

    expect(existsSync(path.join(OUT_DIR, "index.html"))).toBe(true);
    expect(existsSync(path.join(OUT_DIR, "404.html"))).toBe(true);
    expect(existsSync(path.join(OUT_DIR, ".nojekyll"))).toBe(true);

    const html = readFileSync(path.join(OUT_DIR, "index.html"), "utf8");
    expect(html).toContain(`${REPO_BASE_PATH}/_next/static/`);
    expect(html).not.toMatch(/Santa Prod/i);
    expect(html).toContain("soroka prinesla");

    const notFound = readFileSync(path.join(OUT_DIR, "404.html"), "utf8");
    expect(notFound).toContain("Сорока принесла");
    expect(notFound).toContain("404");
    expect(notFound).not.toContain("Избранные творческие проекты");
  });
});
