const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getDepths() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(amount => +amount));
}

async function main() {
  const depths = await getDepths();
  const depthIncreaseCount = depths.reduce((acc, curr, index) => {
    return acc + (curr > depths[index - 1] ? 1 : 0)
  }, 0);

  console.log(depthIncreaseCount);
}

main();
