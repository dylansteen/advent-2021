const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

const expectedClosers = { 
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>',
}

const openers = Object.keys(expectedClosers);

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

async function main() {
  const data = await getData();

  const result = data.map(line => {
    const stack = [];
    return line.split('').find(character => {
      if (openers.includes(character)) {
        stack.push(character);
      } else {
        const opener = stack.pop();
        if (expectedClosers[opener] !== character) {
          return character;
        }
      }
    });
  });
  console.log(result.filter(error => !!error).map(error => points[error]).reduce((acc, curr) => acc + curr));
}
  
main();
  
