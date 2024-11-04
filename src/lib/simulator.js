import SimulatorError from "./simulatorError.js";

const neighbours = Object.values({
  topLeft: [-1, -1],
  topCenter: [-1, 0],
  topRight: [-1, 1],
  centerLeft: [0, -1],
  centerRight: [0, 1],
  bottomLeft: [1, -1],
  bottomCenter: [1, 0],
  bottomRight: [1, 1],
});

export default class Simulator {
  constructor(ruleset, boundaryChecker) {
    this.ruleset = ruleset;
    this.boundaryChecker = boundaryChecker;
  }

  population(world) {
    return world.reduce((acc, row) => {
      return (
        acc +
        row.reduce((rowTotal, cell) => {
          return rowTotal + (cell ? 1 : 0);
        }, 0)
      );
    }, 0);
  }

  checkValidWorld(world) {
    if (!Array.isArray(world) || !world.length || !Array.isArray(world[0])) {
      throw new SimulatorError(
        "Invalid world structure",
        "The world must be a 2D array.",
      );
    }
  }

  /**
   * Analyse the current state of the world and return the next state.
   * @param {Array} world - The current state of the world as a 2D array.
   * @returns {Array} - The next state of the world as a 2D array.
   */
  analyse(world) {
    this.checkValidWorld(world);
    return world.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        // Calculate the total number of live neighbours.
        const cellTotal = neighbours.reduce((acc, neighbour) => {
          const value = this.boundaryChecker.check(
            world,
            rowIndex + neighbour[0], // Neighbour's Y coordinate.
            cellIndex + neighbour[1], // Neighbour's X coordinate.
          );
          return acc + value;
        }, world[rowIndex][cellIndex]); // Start accumulator with the current cell.
        return this.ruleset.apply(cell, cellTotal);
      });
    });
  }
}
