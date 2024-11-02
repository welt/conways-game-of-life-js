import { randomBool } from "../src/lib/random.js";

describe("Random maths utils", () => {
  test("randomBool returns a boolean", () => {
    const result = randomBool();
    expect(typeof result).toBe("boolean");
  });
});
