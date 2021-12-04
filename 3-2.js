const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const transpose = (matrix) => matrix[0].map((_,i) => matrix.map(x => x[i]));

const inverter = {
  '0': '1',
  '1': '0',
};

const noOp = {
  '0': '0', 
  '1': '1',
 }

const mostCommon = (binaryNum) => {
  const onesCount = binaryNum.join('').split('1').length - 1;
  const zeroesCount = binaryNum.length - onesCount;

  if (onesCount === zeroesCount) {
    return null;
  }

  return onesCount > zeroesCount ? '1' : '0';
}

const getRating = (input, mapper, fallBack) => {
  let inputClone = [...input]
  pos = 0;
  while(inputClone.length > 1) {
    const transposedInput = transpose(inputClone);
    const mostCommonNum = mostCommon(transposedInput[pos]);
    const numSelectedByBitCriteria = mapper[mostCommonNum] ?? fallBack;

    inputClone = inputClone.filter(originalNumber => {
      return originalNumber[pos] === numSelectedByBitCriteria;
    });
    pos++;
  }

  return inputClone[0];
}

function getBinaryInput() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => line.split('')));
}

async function main() {
  let originalInput = await getBinaryInput();

  const o2 = getRating(originalInput, noOp, '1');
  const co2 = getRating(originalInput, inverter, '0');

  const result = parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2);
  console.log(result);
}

main();
  


