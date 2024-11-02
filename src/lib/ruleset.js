/**
 * @abstract Class representing a ruleset.
 */
export default class Ruleset {
  constructor() {
    if (new.target === Ruleset) {
      throw new Error(`Can not instantiate Ruleset directly.`);
    }
  }

  /**
   * Applies the ruleset to an organism.
   * @param organism {boolean} - The current state of the organism.
   * @param score {number} - The score of the organism.
   */
  /* eslint-disable no-unused-vars */
  apply(organism, score) {
    throw new Error("Method not implemented.");
  }
}
