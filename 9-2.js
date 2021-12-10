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
        minima.push([x, y]);
      }
    });
  });

  const basinSizes = minima.map(min => growBasin(...min, heightMap, 0, new Set()));
  const [first, second, third] = basinSizes.sort((a, b) => b - a);
  console.log(first * second * third);
}

const growBasin = (x, y, map, count, counted) => {
  const current = map[y][x];
  const left = { index: [x - 1, y], value: map[y]?.[x - 1] };
  const right = { index: [x + 1, y], value: map[y]?.[x + 1] };
  const above = { index: [x, y - 1], value: map[y - 1]?.[x] };
  const below =  { index: [x, y + 1], value: map[y + 1]?.[x] };
  
  let toReturn = 0;

  if (!counted.has(left.index.toString()) && left.value > current && left.value !== 9) {
    counted.add(left.index.toString());
    toReturn += growBasin(...left.index, map, count, counted);
  }

  if (!counted.has(right.index.toString()) && right.value > current && right.value !== 9) {
    counted.add(right.index.toString());
    toReturn += growBasin(...right.index, map, count, counted);
  }

  if (!counted.has(below.index.toString()) && below.value > current && below.value !== 9) {
    counted.add(below.index.toString());
    toReturn += growBasin(...below.index, map, count, counted);
  }

  if (!counted.has(above.index.toString()) && above.value > current && above.value !== 9) {
    counted.add(above.index.toString());
    toReturn += growBasin(...above.index, map, count, counted);
  }

  return toReturn + 1;
}

main();
