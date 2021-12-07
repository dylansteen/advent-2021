const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const genFishMap = () => Array(9).fill(0).reduce((acc, curr, index) => ({...acc, [index]: 0}), {'0': 0});
let fishMap = genFishMap();

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split(',').filter(num => !!num).map(stringNum => +stringNum));
}


const simulateDay = (cycles) => {
  const newFishMap = genFishMap();
  Object.keys(cycles).forEach(day => {
    const fishOnCurrentDay = fishMap[day];

    if (day === '0') {
      newFishMap[6] = fishOnCurrentDay;
      newFishMap[8] = fishOnCurrentDay;
      newFishMap[0] = 0;
    } else {
      newFishMap[day - 1] += fishOnCurrentDay;
    }
  });
  return newFishMap;
}


async function main() {
  const data = await getData();
  const lastDay = 256;
  let day = 0;
  data.forEach(fishOnDay => fishMap[fishOnDay] += 1);

  while(day < lastDay) {
    fishMap = simulateDay(fishMap);
    day++;
  }
  const result = Object.values(fishMap).reduce((acc, curr) => acc + curr);
  console.log(result);
}

main();
