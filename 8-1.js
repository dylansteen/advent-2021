const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => line.split(' | ')));
}

async function main() {
  const data = await getData();
  const uniqueLengths = [2, 4, 3, 7];
  const counts = data.map(line => {
    return line[1].split(' ').filter(segment => uniqueLengths.includes(segment.length)).length;
  });

  const result = counts.reduce((acc, curr) => acc + curr);
  console.log(result);
}

main();
