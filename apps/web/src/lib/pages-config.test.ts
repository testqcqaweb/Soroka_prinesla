import { describe, expect, it } from "vitest";
import {
  GITHUB_PAGES_SITE_URL,
  REPO_BASE_PATH,
  getPagesEnvConfig,
} from "@/lib/pages-config";

describe("pages config", () => {
  it("uses repo base path for GitHub Pages builds", () => {
    const config = getPagesEnvConfig(true);

    expect(config.basePath).toBe("/Soroka_prinesla");
    expect(config.assetPrefix).toBe("/Soroka_prinesla/");
    expect(config.NEXT_PUBLIC_SITE_URL).toBe(GITHUB_PAGES_SITE_URL);
  });

  it("uses empty base path for local builds", () => {
    const config = getPagesEnvConfig(false);

    expect(config.basePath).toBe("");
    expect(config.assetPrefix).toBeUndefined();
    expect(config.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });

  it("keeps constants in sync", () => {
    expect(REPO_BASE_PATH).toBe("/Soroka_prinesla");
    expect(GITHUB_PAGES_SITE_URL).toBe("https://testqcqaweb.github.io/Soroka_prinesla");
  });
});
