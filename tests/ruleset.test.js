import Ruleset from "../src/lib/ruleset.js";

class TestRuleset extends Ruleset {
  apply(organism, score) {
    console.log(organism, score);
  }
}

describe("Ruleset abstract class", () => {
  test("It should throw an error when instantiated directly", () => {
    expect(() => {
      new Ruleset();
    }).toThrow("Can not instantiate Ruleset directly.");
  });

  test("It should not throw an error when extended", () => {
    expect(() => {
      new TestRuleset();
    }).not.toThrow();
  });

  test("It has an apply() method", () => {
    const ruleset = Object.create(Ruleset.prototype);
    expect(typeof ruleset.apply).toBe("function");
  });
});
