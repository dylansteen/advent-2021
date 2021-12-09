const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => line.split(' | ')));
}

const overlap = (first, second) => first.split('').filter(firstChar => second.includes(firstChar)).length;


async function main() {
  const data = await getData();
  let total = 0;

  const sortedData = data.map(line => { 
    return line.map(chars => { 
      return chars.split(' ').map(innerChars => innerChars.split('').sort().join(''));
    });
  });

  sortedData.forEach(line => {
    const chars = line[0];
    const display = line[1];
    const segments = {};
    
    chars.forEach(char => {
      const len = char.length;
      if (len === 2) {
        segments[char] = 1
        return;
      }
      if (len === 4) {
        segments[char] = 4
        return;
      }
      if (len === 3) {
        segments[char] = 7
        return;
      }
      if (len === 7) {
        segments[char] = 8
        return;
      }

      if (len === 6) {
        const four = chars.find(char => char.length === 4);
        const one = chars.find(char => char.length === 2);
        if (overlap(four, char) === 4) {
          segments[char] = 9;
          return;
        }
        if (overlap(one, char) === 2) {
          segments[char] = 0;
          return;
        }
        segments[char] = 6;
        return;
      }

      if (len === 5) {
        const one = chars.find(char => char.length === 2);
        const four = chars.find(char => char.length === 4);
        if (overlap(one, char) === 2) {
          segments[char] = 3;
          return;
        }
        if (overlap(four, char) === 3) {
          segments[char] = 5;
          return;
        }
        segments[char] = 2
        return;
      }
    });
    total += parseInt(display.map(char => segments[char]).join(''));
  });

  console.log(total);
}

main();
