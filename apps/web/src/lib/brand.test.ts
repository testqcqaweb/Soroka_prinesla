import { describe, expect, it } from "vitest";
import { BRAND } from "@/lib/brand";

describe("BRAND", () => {
  it("uses soroka prinesla naming", () => {
    expect(BRAND.name).toBe("soroka prinesla");
    expect(BRAND.shortName).toBe("soroka prinesla");
  });

  it("defines a dark portfolio palette", () => {
    expect(BRAND.colors.charcoal).toBe("#0C0C0C");
    expect(BRAND.colors.crimson).toBe("#8B1F24");
    expect(BRAND.colors.cream).toBe("#F4F0E8");
  });

  it("mentions Kiryl in description", () => {
    expect(BRAND.description).toContain("Сорокина");
  });
});
