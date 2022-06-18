/**
 * A grid of random boolean vals is evaluated against 
 * the rules for Conway's Game of Life. This grid
 * is an array of arrays, ie. array[row][column].
 * @depends Node >= v18
 * @see [Scientifc American, Oct 1970]
 * @see Alan Zucconi film: https://www.youtube.com/watch?v=Kk2MH9O4pXY
 * @file gameOfLife.js
 */

/* eslint-disable no-console */
const ROWS = 30;
const COLUMNS = 30;
const stack = [];

const nodeCrypto = () => {
  try {
    return require('node:crypto').webcrypto;
  } catch(err) {
    console.error('Wrong Node version, or crypto support is disabled.\n', err);
  }
}
const crypto = nodeCrypto();

const randomBool = (() => {
  const a = new Uint8Array(1);
  return () => {
    crypto.getRandomValues(a);
    return a[0] > 127;
  };
})();

const sensorArray = Object.values({
  topLeft: [-1, -1], 
  topCenter: [-1, 0], 
  topRight: [-1, 1],
  centerLeft: [0, -1],
  centerRight: [0, 1],
	bottomLeft: [1, -1],
  bottomCenter: [1, 0],
  bottomRight: [1, 1],
});

const makeGrid = (rows, columns) => new Array(rows)
    .fill(null)
    .map(() => (new Array(columns).fill(null)));

const populateCells = (grid) => grid.map((row) => {
  return row.map(() => randomBool());
});

const onWorld = (arr, row, col) => {
  try {
    return arr[row][col];
  } catch(err) {
    return null;
  }
};

const determinator = (item, score) => {
  if (score > 4 || score < 3) {
    return false;
  }
  if (score === 3) {
    return true;
  }
  return item;
};

const analyse = (stage, sensors) => {
  return stage.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      const cellTotal = sensors.reduce((acc, sensor) => {
        const value = onWorld(stage, rowIndex + sensor[0], cellIndex + sensor[1]);
        // eslint-disable-next-line no-bitwise
        return acc + ~~value;
      }, 0);
      return determinator(cell, cellTotal);
    })
  })
};

const hasDiedOut = (arr) => arr.reduce((acc, row) => {
  return acc + row.reduce((rowTotal, cell) => {
    return rowTotal + ~~cell;
  }, 0)
}, 0) === 0;

const visualise = (stage) => stage
  .map((row) => row.reduce((acc, item) => `${acc}${(item ? '•' : '-')}`, ''))
  .join('\n');

function main() {
  const world = populateCells(makeGrid(ROWS, COLUMNS));
  let generation = 1;
  stack.push(analyse(world, sensorArray));
  process.stdout.write(`Generation ${generation}\n`);
  process.stdout.write(visualise(stack[0]) + '\n');
  while (stack.length) {
    stack.push(analyse(stack[0], sensorArray));
    process.stdout.write(`Generation ${generation}\n`);
    process.stdout.write(visualise(stack[1]) + '\n');
    if (hasDiedOut(stack[1])) {
      break
    }
    stack.shift();
    generation += 1;
  }
  process.stdout.write(`Died out after ${generation - 1} generations. \n`);
}

main();
