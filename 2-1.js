const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getInstructions() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => {
    const [direction, magnitude] = line.split(' ');
    return { direction, magnitude: +magnitude };
  }));
}

async function main() {
  const instructions = await getInstructions();
  const resultPosition = instructions.reduce((acc, curr) => {
    return mover[curr.direction](acc, curr.magnitude);
  }, { x: 0, y: 0 });

  console.log(resultPosition);
  console.log(resultPosition.x * resultPosition.y);
}

main();

const mover = {
  'forward': (coords, mag) => ({ ...coords, x: coords.x + mag }),
  'down': (coords, mag) => ({ ...coords, y: coords.y + mag }),
  'up': (coords, mag) => ({ ...coords, y: coords.y - mag }),
}

