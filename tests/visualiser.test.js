import Visualiser from "../src/lib/visualiser.js";

class TestVisualiser extends Visualiser {
  draw(world, i) {
    console.log(world, i);
  }
}

describe("Test the Visualiser abstract class", () => {
  test("It should throw an error when instantiated directly", () => {
    expect(() => {
      new Visualiser();
    }).toThrow("Can not instantiate Visualiser directly.");
  });

  test("It should not throw an error when extended", () => {
    expect(() => {
      new TestVisualiser();
    }).not.toThrow();
  });

  test("It has a draw() method", () => {
    const visualiser = Object.create(Visualiser.prototype);
    expect(typeof visualiser.draw).toBe("function");
  });
});
