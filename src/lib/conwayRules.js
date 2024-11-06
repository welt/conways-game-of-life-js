import Ruleset from "./ruleset.js";

export default class ConwayRules extends Ruleset {
  apply(cell, score) {
    if (score > 3 || score < 2) {
      return 0;
    }
    if (score === 3) {
      return 1;
    }
    return cell;
  }
}
