import { jest } from "@jest/globals";
import ConwayRules from "../src/lib/conwayRules.js";
import IsOnWorld from "../src/lib/isOnWorld.js";
import Simulator from "../src/lib/simulator.js";

describe("Test the analyser rule functions", () => {
  const conwayRules = new ConwayRules();

  test("It calculates the Conway's score correctly for a live cell", () => {
    const cell = 1;
    expect(conwayRules.apply(cell, 5)).toBe(0);
    expect(conwayRules.apply(cell, 2)).toBe(0);
    expect(conwayRules.apply(cell, 3)).toBe(1);
    expect(conwayRules.apply(cell, 4)).toBe(cell);
  });

  test("It calculates the Conway's score correctly for a dead cell", () => {
    const cell = 0;
    expect(conwayRules.apply(cell, 5)).toBe(0);
    expect(conwayRules.apply(cell, 2)).toBe(0);
    expect(conwayRules.apply(cell, 3)).toBe(1);
    expect(conwayRules.apply(cell, 4)).toBe(cell);
  });
});

/**
 * Test calculated results against known results for Conway's Game of Life.
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
describe("Evaluate against known Game of Life results", () => {
  let simulator;
  let ruleset;
  let boundaryChecker;

  beforeEach(() => {
    ruleset = new ConwayRules();
    boundaryChecker = new IsOnWorld();
    simulator = new Simulator(ruleset, boundaryChecker);
  });

  test("It correctly predicts the result of a 4x4 Block world", () => {
    // Conway's 4x4 Block formation should remain unchanged, it's stable.
    const world = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 6x5 Beehive world", () => {
    // Conway's 6x5 Beehive formation should remain unchanged, it's stable.
    const world = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 6x6 Loaf world", () => {
    // Conway's 6x6 Loaf formation should remain unchanged, it's stable.
    const world = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 5x5 Boat world", () => {
    // Conway's 5x5 Boat formation should remain unchanged, it's stable.
    const world = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 5x5 Tub world", () => {
    // Conway's 5x5 Tub formation should remain unchanged, it's stable.
    const world = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 5x5 Blinker world (t = 1)", () => {
    // Conway's 5x5 horizontal Blinker formation should change to a vertical line.
    const world = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 6x6 Toad world (t = 1)", () => {
    // Conway's 6x6 Toad formation should ribbit.
    const world = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 6x6 Beacon world (t = 1)", () => {
    // Conway's 6x6 Beacon formation should wink.
    const world = [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(simulator.analyse(world)).toEqual(expected);
  });

  test("It correctly predicts the result of a 6x6 Glider world (t = 0 to t = 4)", () => {
    // Conway's Glider formation should move diagonally across the world.
    const expectedGliderStates = [
      [
        // t = 0
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      [
        // t = 1
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      [
        // t = 2
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      [
        // t = 3
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      [
        // t = 4
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    ];
    for (let t = 0; t < expectedGliderStates.length - 1; t++) {
      const res = simulator.analyse(expectedGliderStates[t]);
      expect(res).toEqual(expectedGliderStates[t + 1]);
    }
  });
});
