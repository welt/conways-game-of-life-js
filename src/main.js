/**
 * A grid of random boolean values is evaluated against
 * the rules for Conway's Game of Life. This grid
 * is an array of arrays, ie. array[row][column].
 * @depends Node >= v18 || Deno >= v2.0
 * @see Scientifc American, Oct 1970, https://www.ibiblio.org/lifepatterns/october1970.html
 * @see Alan Zucconi film: https://www.youtube.com/watch?v=Kk2MH9O4pXY
 * @file main.js
 */
import ConwayRules from "./lib/conwayRules.js";
import IsOnWorld from "./lib/isOnWorld.js";
import Simulator from "./lib/simulator.js";
import SimulatorError from "./lib/simulatorError.js";
import TextConsole from "./lib/textConsole.js";
import WorldMaker from "./lib/worldMaker.js";
import { randomBool } from "./lib/random.js";

const ROWS = 6;
const COLUMNS = 6;
const DELAY_IN_MS = 0;
const MAX_STACK_SIZE = 2000;
const RANDOM = () => Math.random() >= 0.5;

const defaults = {
  rows: ROWS,
  columns: COLUMNS,
  random: RANDOM,
};

function checkStackOverflow(generation) {
  if (generation > MAX_STACK_SIZE) {
    throw new SimulatorError(
      `Population remains stable after ${MAX_STACK_SIZE} generations.`,
      `Potential stack overflow detected.`,
    );
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const visualiser = new TextConsole();

const ruleset = new ConwayRules();

const boundaryChecker = new IsOnWorld();

const simulator = new Simulator(ruleset, boundaryChecker);

const hasDiedOut = (world) => simulator.population(world) === 0;

async function runSimulation(world, delay = DELAY_IN_MS) {
  const stack = [];
  let i = 0;
  const newWorld = world.getWorld;
  visualiser.draw(newWorld, i, simulator.population(newWorld));
  stack.push(newWorld);
  while (stack.length) {
    i += 1;
    checkStackOverflow(i);
    const nextGeneration = simulator.analyse(stack.pop());
    visualiser.draw(nextGeneration, i, simulator.population(nextGeneration));
    if (hasDiedOut(nextGeneration)) {
      process.stdout.write(`Died-out after ${i - 1} generations.\n`);
    } else {
      stack.push(nextGeneration);
    }
    await sleep(delay);
  }
}

async function main(options) {
  const args = { ...defaults, ...options };
  const world = new WorldMaker(args);
  try {
    process.stdout.write(`Starting simulation...\n\n`);
    await runSimulation(world);
    process.stdout.write(`Simulation complete.\n`);
  } catch (error) {
    if (error instanceof SimulatorError) {
      process.stdout.write(`${error.message}\n${error.cause}\n`);
      process.stdout.write(`Simulation stopped.\n`);
    } else {
      throw error;
    }
  }
}

main({ randomiser: randomBool });
