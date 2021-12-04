const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const transpose = (matrix) => matrix[0].map((x,i) => matrix.map(x => x[i]));
const onesComp = binArr => binArr.map(digit => digit === '1' ? '0' : '1');

function getBinaryInput() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line).map(line => line.split('')));
}

async function main() {
  const transposedInput = transpose(await getBinaryInput());
  const gamma = transposedInput.map(binaryNum => {
      const length = binaryNum.length;
      const onesCount = binaryNum.join('').split('1').length - 1;
      return onesCount > length / 2 ? '1' : '0';
    });
    
    const epsilon = onesComp(gamma);

    const result = parseInt(epsilon.join(''), 2) * parseInt(gamma.join(''), 2);
    console.log(result);
  }
  
main();
  


