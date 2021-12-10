const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => line.split('').map(stringNum => +stringNum)));
}

async function main() {
  const heightMap = await getData();
  const minima = [];

  heightMap.forEach((row, y) => {
    row.forEach((point, x) => {
      const left = row[x - 1];
      const right = row[x + 1];
      const above = heightMap[y - 1]?.[x];
      const below = heightMap[y + 1]?.[x];

      if([left, right, above, below].every(neighbor => neighbor === undefined || neighbor > point)) {
        minima.push(point);
      }
    });
  });

  const result = minima.map(x => +x).reduce((acc, curr) => acc + curr + 1, 0);
  console.log(result);
}

main();
