/**
 * @abstract Class representing a boundary checker.
 */
export default class BoundaryChecker {
  constructor() {
    if (new.target === BoundaryChecker) {
      throw new Error(`Can not instantiate BoundaryChecker directly.`);
    }
  }

  /**
   * Returns whether row and column coordinates exist in world.
   * @param world {Array<Array<boolean>>}
   * @param row {number}
   * @param column {number}
   */
  /* eslint-disable no-unused-vars */
  check(world, row, column) {
    throw new Error("Method not implemented.");
  }
}
