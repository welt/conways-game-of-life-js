import Visualiser from "./visualiser.js";

export default class TextConsole extends Visualiser {
  /**
   * Renders 2D world array to a string.
   * @param arr {Array<Array<boolean>>}
   * @returns String
   */
  render(arr) {
    return arr
      .map((row) => row.reduce((acc, item) => `${acc}${item ? "*" : "-"}`, ""))
      .join("\n");
  }

  /**
   * Draws the grid to the console.
   * @param world {Array<Array<boolean>>}
   * @param generation {number}
   * @returns void
   */
  draw(world, generation, population) {
    process.stdout.write(
      `Generation ${generation}, Population ${population}\n`,
    );
    process.stdout.write(this.render(world) + "\n\n");
  }
}
