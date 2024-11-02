/**
 * Creates a grid of organisms at random coordinates
 * for use as a world in the simulator.
 */
export default class WorldMaker {
  /**
   * @param { number } size - The size of the world.
   * @param { Function } randomBool - A function that returns a random boolean.
   */
  constructor(size = [16, 16], randomBool = () => Math.random() > 0.5) {
    this.size = size;
    this.randomBool = randomBool;
    this.world = this.createWorld();
  }

  createWorld() {
    const [rows, columns] = this.size;
    const grid = this.makeGrid(rows, columns);
    return this.populateCells(grid);
  }

  makeGrid(rows, columns) {
    return new Array(rows).fill(null).map(() => new Array(columns).fill(null));
  }

  populateCells(grid) {
    return grid.map((row) => {
      return row.map(() => this.randomBool());
    });
  }

  get getWorld() {
    return this.world;
  }
}
