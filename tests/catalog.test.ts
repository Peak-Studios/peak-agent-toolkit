import { describe, expect, it } from "vitest";
import { catalog, filterScripts, findScript, searchCatalog } from "../src/catalog.js";
import { createPeakServer } from "../src/server.js";

describe("public catalog", () => {
  it("contains exactly the approved scripts", () => {
    expect(catalog.scripts.map((script) => script.id).sort()).toEqual(["peak-bridge", "peak-chess", "peak-clothingitems", "peak-sprays", "peak-trucking"]);
  });

  it("records provenance for every section", () => {
    for (const script of catalog.scripts) {
      expect(script.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
      expect(script.repository).toMatch(/^https:\/\/github\.com\/Peak-Studios\//);
      expect(script.sections.length).toBeGreaterThan(0);
      expect(script.sections.every((section) => section.sourceUrl.startsWith(script.repository))).toBe(true);
    }
  });

  it("filters and searches case-insensitively", () => {
    expect(filterScripts({ framework: "qbox" }).length).toBeGreaterThan(0);
    expect(findScript("PEAK-CHESS")?.id).toBe("peak-chess");
    expect(searchCatalog("installation", 3).length).toBeLessThanOrEqual(3);
  });

  it("constructs a server with all registrations", () => {
    expect(createPeakServer()).toBeDefined();
  });
});
