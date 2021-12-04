const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const transpose = (matrix) => matrix[0].map((_,i) => matrix.map(x => x[i]));

function getData() { 
  return readFile('input.txt', 'utf8').then((data) => { 
    const [numbers, ...cards] = data.split('\n\n');
    return [numbers.split(','), cards.map(card => card.split('\n').filter(line => !!line).map(line => line.split(/\s+/).filter(line => !!line)))];
  });
}

async function main() {
  const [numbers, originalCards] = (await getData());

  let winningCard = undefined;
  let cards = clone(originalCards);
  for (const bingoNumber of numbers) {
    cards = call(bingoNumber, cards);
    winningCard = findWinner(cards);

    if (winningCard) {
      const boardSum = winningCard.flat().map(x => +x).filter(x => !isNaN(x)).reduce((acc, curr) => acc + curr);
      console.log(boardSum * bingoNumber);
      break;
    }
  }
}

const call = (number, bingoCards) => bingoCards.map(card => card.map(row => row.map(cardNumber => number === cardNumber ? 'X' : cardNumber)));

const isWinningCard = card => card.some(row => row.every(space => space === 'X'));

const findWinner = (bingoCards) => bingoCards.find(isWinningCard) || bingoCards.map(transpose).find(isWinningCard);

const clone = (card) => (
  [...card.map(row => [...row])]
);

main();
  


