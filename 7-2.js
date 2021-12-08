const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split(',').filter(num => !!num).map(stringNum => +stringNum));
}

const triangle = (n) => (n*(n+1))/2

async function main() {
  const positions = await getData();
  const furthestCrab = Math.max(...positions);
  let minFuel = Infinity;
  let currentPos = 0;

  while (currentPos <= furthestCrab) {
    const fuelForPosition = positions.reduce((totalFuel, currentCrab) => totalFuel + triangle(Math.abs(currentCrab - currentPos)), 0);
    minFuel = Math.min(minFuel, fuelForPosition);
    currentPos++
  }

  console.log(minFuel);
}

main();
