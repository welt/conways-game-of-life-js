import BoundaryChecker from "./boundaryChecker.js";

const isValidCoordinate = (world, row, column) => {
  return (
    row >= 0 && row < world.length && column >= 0 && column < world[row].length
  );
};

export default class IsOnWorld extends BoundaryChecker {
  check(world, row, column) {
    if (isValidCoordinate(world, row, column)) {
      return world[row][column];
    }
    return null;
  }
}
