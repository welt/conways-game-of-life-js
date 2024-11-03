import { randomBool } from "../src/lib/random.js";

describe("Test custom maths utils", () => {
  test("It returns a one or a zero", () => {
    const result = randomBool();
    expect(result === 0 || result === 1).toBe(true);
  });
});
