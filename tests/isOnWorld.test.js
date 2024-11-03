import IsOnWorld from "../src/lib/isOnWorld.js";

describe("Test the boundary check functions", () => {
  test("It checks if a coordinate is on world", () => {
    const world = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
    const checker = new IsOnWorld();

    expect(checker.check(world, 1, 1)).toBe(1);
    expect(checker.check(world, 2, 2)).toBe(0);
    expect(checker.check(world, 1, 2)).toBe(1);
    expect(checker.check(world, 3, 3)).toBe(0);
    expect(checker.check(world, 4, 4)).toBe(0);
    expect(checker.check(world, -3, -3)).toBe(0);
  });
});
