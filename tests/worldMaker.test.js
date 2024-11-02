import WorldMaker from "../src/lib/worldMaker.js";

describe("WorldMaker class", () => {
  test("It creates a world of the correct dimensions", () => {
    const size = [10, 10];
    const worldMaker = new WorldMaker(size, () => true);
    const world = worldMaker.getWorld;

    expect(world.length).toBe(size[0]);
    expect(world[0].length).toBe(size[1]);
  });

  test("It populates the world with boolean values", () => {
    const size = [5, 5];
    const worldMaker = new WorldMaker(size, () => true);
    const world = worldMaker.getWorld;

    world.forEach((row) => {
      row.forEach((cell) => {
        expect(typeof cell).toBe("boolean");
      });
    });
  });
});
