import IsOnWorld from "../src/lib/isOnWorld.js";

describe("Test the boundary check functions", () => {
  test("It checks if a coordinate is on world", () => {
    const world = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const checker = new IsOnWorld();

    expect(checker.check(world, 1, 1)).toBe(5);
    expect(checker.check(world, 3, 3)).toBe(false);
  });
});
