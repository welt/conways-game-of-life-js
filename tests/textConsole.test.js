import { jest } from "@jest/globals";
import TextConsole from "../src/lib/textConsole.js";

describe("Test the TextConsole visualiser class", () => {
  let textConsole;

  beforeEach(() => {
    textConsole = new TextConsole();
  });

  test("It correctly renders the world array to a string", () => {
    const input = [
      [true, false, true],
      [false, true, false],
      [true, true, true],
    ];
    const expectedOutput = "*-*\n-*-\n***";
    expect(textConsole.render(input)).toBe(expectedOutput);
  });

  test("It correctly outputs the generation number, population and the rendered world", () => {
    const input = [
      [1, 0],
      [0, 1],
    ];
    const generation = 1;
    const population = 2;
    const consoleSpy = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => {});
    textConsole.draw(input, generation, population);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Generation ${generation}, Population ${population}\n`,
    );
    expect(consoleSpy).toHaveBeenCalledWith("*-\n-*\n\n");
    consoleSpy.mockRestore();
  });
});
