const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getDepths() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(amount => +amount));
}


async function main() {
  const depths = await getDepths();
  console.log(depths);
  const depthIncreaseCount = depths.reduce((acc, curr, index) => {
    if(!depths[index - 1] || !depths[index - 2] | !depths[index - 3]) {
      return acc;
    }

    const currWindow = depths[index] + depths[index - 1] + depths[index - 2];
    const prevWindow = depths[index - 1] + depths[index - 2] + depths[index - 3];

    return acc + (currWindow > prevWindow ? 1 : 0)
  }, 0);

  console.log(depthIncreaseCount);
}

main();
