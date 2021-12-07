const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split(',').filter(num => !!num).map(stringNum => +stringNum));
}

const simulateDay = (cycles) => {
  const nextCycle = [];
  cycles.forEach(daysLeftInCycle => {
    if (daysLeftInCycle - 1 === -1) {
      nextCycle.push(6);
      nextCycle.push(8);
    } else {
      nextCycle.push(daysLeftInCycle - 1);
    }
  });
  return nextCycle;
}

async function main() {
  const data = await getData();
  const lastDay = 80;
  let day = 0;
  let resultingFish = [...data]

  while(day < lastDay) {
    resultingFish = simulateDay(resultingFish);
    day++;
  }
  console.log(resultingFish.length);
}

main();
