import WorldMaker from "../src/lib/worldMaker.js";

describe("Test the WorldMaker class", () => {
  test("It creates a world of the correct dimensions", () => {
    const opts = {
      rows: 10,
      columns: 10,
      random: () => 1,
    };
    const worldMaker = new WorldMaker(opts);
    const world = worldMaker.getWorld;

    expect(world.length).toBe(opts.rows);
    expect(world[0].length).toBe(opts.columns);
  });

  test("It populates the world with supplied values", () => {
    const opts = {
      rows: 5,
      columns: 5,
      random: () => (Math.random() >= 0.5 ? 1 : 0),
    };
    const worldMaker = new WorldMaker(opts);
    const world = worldMaker.getWorld;

    world.forEach((row) => {
      row.forEach((cell) => {
        expect(cell === 0 || cell === 1).toBe(true);
      });
    });
  });
});
