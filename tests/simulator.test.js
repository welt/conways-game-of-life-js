import { jest } from "@jest/globals";
import Simulator from "../src/lib/simulator.js";

describe("Test the Simulator class", () => {
  let simulator;
  let ruleset;
  let boundaryChecker;

  beforeEach(() => {
    ruleset = {
      apply: jest.fn((cell, cellTotal) => (cellTotal > 2 ? 1 : 0)),
    };
    boundaryChecker = {
      check: jest.fn((world, row, col) =>
        world[row] && world[row][col] ? 1 : 0,
      ),
    };
    simulator = new Simulator(ruleset, boundaryChecker);
  });

  test("Its hasDiedOut() method returns true for an empty world", () => {
    const world = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(simulator.hasDiedOut(world)).toBe(true);
  });

  test("Its hasDiedOut() method returns false for a non-empty world", () => {
    const world = [
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(simulator.hasDiedOut(world)).toBe(false);
  });
});
