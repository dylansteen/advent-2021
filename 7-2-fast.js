const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const {performance} = require('perf_hooks');


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
    let i = 0;
    let fuelForPosition = 0;
    while(i < positions.length - 1) {
      fuelForPosition += triangle(Math.abs(positions[i] - currentPos));
      if(fuelForPosition > minFuel) break;
      i++;
    }
    minFuel = Math.min(minFuel, fuelForPosition);
    currentPos++
  }
  console.log(minFuel);
}

main();
