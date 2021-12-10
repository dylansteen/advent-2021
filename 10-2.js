const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

const closers = { 
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>',
}

const openers = Object.keys(closers);

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const isIncomplete = (line) => {
  const stack = [];
  return !line.split('').find(character => {
    if (openers.includes(character)) {
      stack.push(character);
    } else {
      const opener = stack.pop();
      if (closers[opener] !== character) {
        return character;
      }
    }
  });
}

async function main() {
  const data = await getData();

  const incompleteLines = data.filter(isIncomplete);

  const unclosedBrackets = incompleteLines.map(line => {
    const stack = [];
    line.split('').forEach(character => {
      if (openers.includes(character)) {
        stack.push(character);
      } else {
        stack.pop();
      }
   });
   return stack.reverse();
  });

  const charScores = unclosedBrackets.map(line => line.map(res => closers[res]).map(char => points[char]));
  const lineScores = charScores.map(line => line.reduce((acc, curr) => acc * 5 + curr, 0));
  const middleIndex = Math.floor(lineScores.length / 2);
  const finalResult = lineScores.sort((a, b) => a - b)[middleIndex];

  console.log(finalResult);
}
  
main();
  
