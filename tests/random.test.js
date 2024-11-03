import { randomBool } from "../src/lib/random.js";

describe("Test custom maths utils", () => {
  test("randomBool returns a boolean", () => {
    const result = randomBool();
    expect(result === 0 || result === 1).toBe(true);
  });
});
