const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => { 
    return data.split('\n').filter(line => !!line).map(line => line.split(' -> ').map(xAndY => xAndY.split(',').map(stringNum => +stringNum).reduce((acc, curr, index) => ({ ...acc, x: index === 0 ? curr : acc.x, y: index === 1 ? curr : acc.y}), {})));
  });
}

const move = (current, destination) => {
  if (current.x < destination.x) {
    current.x += 1;
  }

  if (current.x > destination.x) {
    current.x -= 1;
  }

  if (current.y < destination.y) {
    current.y += 1;
  }

  if (current.y > destination.y) {
    current.y -= 1;
  }
}

const drawLine = (start, end, currentPoints) => {
  let currPos = { ...start };

  while(!(currPos.x === end.x && currPos.y === end.y)) {
    const stringPos = `${currPos.x}, ${currPos.y}`;
    if (!currentPoints[stringPos]) {
      currentPoints[stringPos] = 1;
    } else {
      currentPoints[stringPos] += 1;
    }

    move(currPos, end);
  }

  const stringPos = `${currPos.x}, ${currPos.y}`;
  if (!currentPoints[stringPos]) {
    currentPoints[stringPos] = 1;
  } else {
    currentPoints[stringPos] += 1;
  }
}

async function main() {
  const data = await getData();

  const resultMap = data.reduce((acc, curr) => {

    const [start, end] = curr;

    drawLine(start, end, acc);

    return acc;
  }, {});

  const result = Object.values(resultMap).reduce((acc, curr) => curr >= 2 ? acc + 1 : acc, 0);
  console.log(result);
}

main();
  


