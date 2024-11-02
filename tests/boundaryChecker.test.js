import BoundaryChecker from "../src/lib/boundaryChecker.js";

class TestBoundaryChecker extends BoundaryChecker {
  draw() {
    console.log("checking boundaries...");
  }
}

describe("BoundaryChecker abstract class", () => {
  test("It should throw an error when instantiated directly", () => {
    expect(() => {
      new BoundaryChecker();
    }).toThrow("Can not instantiate BoundaryChecker directly.");
  });

  test("It should not throw an error when extended", () => {
    expect(() => {
      new TestBoundaryChecker();
    }).not.toThrow();
  });

  test("It has a check() method", () => {
    const checker = Object.create(BoundaryChecker.prototype);
    expect(typeof checker.check).toBe("function");
  });
});
