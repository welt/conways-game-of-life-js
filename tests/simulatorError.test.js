import SimulatorError from "../src/lib/simulatorError.js";

describe("SimulatorError custom error class", () => {
  test("It sets message and cause correctly", () => {
    const message = "An error occurred";
    const cause = "Root cause";
    const error = new SimulatorError(message, cause);

    expect(error.message).toBe(message);
    expect(error.cause).toBe(cause);
    expect(error.name).toBe("Simulator Error");
  });
});
