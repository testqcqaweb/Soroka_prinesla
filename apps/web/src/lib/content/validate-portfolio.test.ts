import { describe, expect, it } from "vitest";
import { ABOUT, NAV, SITE, WORK } from "@/lib/content/portfolio";
import {
  SECTION_IDS,
  assertValidPortfolioContent,
  validatePortfolioContent,
} from "@/lib/content/validate-portfolio";

describe("portfolio content", () => {
  it("passes full validation without issues", () => {
    expect(() => assertValidPortfolioContent()).not.toThrow();
    expect(validatePortfolioContent()).toEqual([]);
  });

  it("has unique work slugs", () => {
    const slugs = WORK.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes featured projects", () => {
    expect(WORK.some((item) => item.featured)).toBe(true);
  });

  it("provides illustrations and links for every project", () => {
    for (const item of WORK) {
      expect(item.image).toMatch(/^\/work\/.+\.(svg|png|jpe?g|webp)$/);
      expect(item.links.length).toBeGreaterThan(0);
      expect(item.links.every((link) => link.href.startsWith("https://") || link.href.startsWith("/books/") || link.href.startsWith("/video/"))).toBe(true);
    }
  });

  it("exposes social links in contact data", () => {
    expect(SITE.social.telegram.label).toBe("@sorokaprineslaa");
    expect(SITE.social.instagram.label).toBe("@sorokaprineslaa");
  });

  it("covers all page sections in navigation", () => {
    const navTargets = NAV.map((item) => item.href.replace("#", ""));
    expect(navTargets).toEqual([...SECTION_IDS]);
  });

  it("stores expected language levels", () => {
    const levels = Object.fromEntries(ABOUT.languages.map((item) => [item.lang, item.level]));

    expect(levels["Английский"]).toBe("B2");
    expect(levels["Немецкий"]).toBe("B1");
    expect(levels["Чешский"]).toBe("C1");
    expect(levels["Словацкий"]).toBe("B2");
  });
});
