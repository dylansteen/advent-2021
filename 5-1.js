const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const transpose = (matrix) => matrix[0].map((_,i) => matrix.map(x => x[i]));

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => { 
    return data.split('\n').filter(line => !!line).map(line => line.split(' -> ').map(xAndY => xAndY.split(',').map(stringNum => +stringNum)));
  });
}

const isHorizontal = ([startX, startY], [endX, endY]) => startX === endX;
const isVertical = ([startX, startY], [endX, endY]) => startY === endY;

const move = (current, destination) => current < destination ? current + 1 : current - 1;

const drawHorizontal = (start, end, currentPoints) => {
  if (isHorizontal(start, end)) {
    let currPos = [...start];

    while(currPos[1] !== end[1]) {
      const stringPos = currPos.map(String).join(',');
      if (!currentPoints[stringPos]) {
        currentPoints[stringPos] = 1;
      } else {
        currentPoints[stringPos] += 1;
      }

      currPos[1] = move(currPos[1], end[1]);
    }
    const stringPos = currPos.map(String).join(',');
    if (!currentPoints[stringPos]) {
      currentPoints[stringPos] = 1;
    } else {
      currentPoints[stringPos] += 1;
    }

    currPos[1] = move(currPos[1], end[1]);
  }
}

const drawVertical = (start, end, currentPoints) => {
  if (isVertical(start, end)) {
    let currPos = [...start];

    while(currPos[0] !== end[0]) {
      const stringPos = currPos.map(String).join(',');
      if (!currentPoints[stringPos]) {
        currentPoints[stringPos] = 1;
      } else {
        currentPoints[stringPos] += 1;
      }

      currPos[0] = move(currPos[0], end[0]);
    }

    const stringPos = currPos.map(String).join(',');
    if (!currentPoints[stringPos]) {
      currentPoints[stringPos] = 1;
    } else {
      currentPoints[stringPos] += 1;
    }

    currPos[0] = move(currPos[0], end[0]);
  }
}

async function main() {
  const data = await getData();

  const resultMap = data.reduce((acc, curr) => {

    const [start, end] = curr;

    drawHorizontal(start, end, acc);
    drawVertical(start, end, acc);

    return acc;
  }, {});

  const result = Object.values(resultMap).reduce((acc, curr) => curr >= 2 ? acc + 1 : acc, 0);
  console.log(result);
}

main();
  


