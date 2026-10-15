import { describe, expect, it } from "vitest";
import { componentCatalog, filterCatalog } from "./catalog";

describe("component gallery", () => {
  it("contains stable unique component IDs", () => {
    const ids = componentCatalog.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(4);
  });

  it("filters by category and preserves all entries for Todos", () => {
    expect(filterCatalog(componentCatalog, "Controles").every((entry) => entry.category === "Controles")).toBe(true);
    expect(filterCatalog(componentCatalog, "Todos")).toHaveLength(componentCatalog.length);
  });
});

