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

  hasDiedOut(world) {
    return (
      world.reduce((acc, row) => {
        return (
          acc +
          row.reduce((rowTotal, cell) => {
            return rowTotal + ~~cell;
          }, 0)
        );
      }, 0) === 0
    );
  }

  analyse(world) {
    return world.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const cellTotal = neighbours.reduce((acc, neighbour) => {
          const value = this.boundaryChecker.check(
            world,
            rowIndex + neighbour[0],
            cellIndex + neighbour[1],
          );
          return acc + ~~value;
        }, 0);
        return this.ruleset.apply(cell, cellTotal);
      });
    });
  }
}
