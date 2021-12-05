const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => { 
    return data
      .split('\n')
      .filter(line => !!line)
      .map(line => 
          line.split(' -> ')
          .map(xAndY => 
            xAndY.split(',')
            .map(stringNum =>
              +stringNum).reduce((acc, curr, index) => ({ ...acc, x: index === 0 ? curr : acc.x, y: index === 1 ? curr : acc.y}), {})));
  });
}

const inverter = {
  'x': 'y',
  'y': 'x',
};

const isCardinal = (start, end, axis) => start[inverter[axis]] === end[inverter[axis]];

const move = (current, destination) => current < destination ? current + 1 : current - 1;


const drawPoint = (position, positionsMap) => {
  const stringPos = `${position.x}, ${position.y}`;
  if (!positionsMap[stringPos]) {
    positionsMap[stringPos] = 1;
  } else {
    positionsMap[stringPos] += 1;
  }
}


const drawLine = (start, end, currentPoints, direction) => {
  if (isCardinal(start, end, direction)) {
    let currPos = { ...start };

    while(currPos[direction] !== end[direction]) {
      drawPoint(currPos, currentPoints);

      currPos[direction] = move(currPos[direction], end[direction]);
    }

    // Extra for destination point
    drawPoint(currPos, currentPoints);
  }
}

async function main() {
  const data = await getData();

  const resultMap = data.reduce((acc, curr) => {

    const [start, end] = curr;

    drawLine(start, end, acc, 'y');
    drawLine(start, end, acc, 'x');

    return acc;
  }, {});

  const result = Object.values(resultMap).reduce((acc, curr) => curr >= 2 ? acc + 1 : acc, 0);
  console.log(result);
}

main();
  


