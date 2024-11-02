import { jest } from "@jest/globals";
import ConwayRules from "../src/lib/conwayRules.js";

describe("test analyser functions", () => {
  const organism = "lorem-anything";
  const conwayRules = new ConwayRules();

  test("conwayRules should determine Conway's value correctly", () => {
    expect(conwayRules.apply(organism, 5)).toBe(false);
    expect(conwayRules.apply(organism, 2)).toBe(false);
    expect(conwayRules.apply(organism, 3)).toBe(true);
    expect(conwayRules.apply(organism, 4)).toBe(organism);
  });
});
