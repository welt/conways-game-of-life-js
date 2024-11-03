/**
 * @abstract Class representing a visualiser.
 */
export default class Visualiser {
  constructor() {
    if (new.target === Visualiser) {
      throw new Error(`Can not instantiate Visualiser directly.`);
    }
  }

  /**
   * Draws a 2D world grid.
   * @param world {Array<Array<boolean>>} - A 2D array representing the grid of organisms.
   * @param i {number} - The current generation
   * @returns void
   */
  /* eslint-disable no-unused-vars */
  draw(world, i) {
    throw new Error("Method not implemented.");
  }
}
