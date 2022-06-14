/* eslint-disable no-console */
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

const makeGrid = (x, y) => new Array(x)
    .fill(null)
    .map(() => (new Array(y).fill(null)));

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

const determinator = (score, item) => {
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
        return acc + ~~value;
      }, 0);
      return determinator(cellTotal, cell);
    })
  })
};

const visualise = (stage) => stage
	.map((row) => row.reduce(
    (acc, item) => `${acc}${(item ? '•' : '-')}`, '',
  )
).join('\n');

const world = populateCells(makeGrid(8, 8));
console.log('world >> ', visualise(world));

const result = analyse(world, sensorArray);
console.log('result >> ', visualise(result));

// ToDo: Recurse & Mocha
