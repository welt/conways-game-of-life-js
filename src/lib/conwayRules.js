import Ruleset from "./ruleset.js";

export default class ConwayRules extends Ruleset {
  apply(organism, score) {
    if (score > 4 || score < 3) {
      return false;
    }
    if (score === 3) {
      return true;
    }
    return organism;
  }
}
