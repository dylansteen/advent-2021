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

  let cards = clone(originalCards);
  for (const bingoNumber of numbers) {
    cards = call(bingoNumber, cards);
    if (cards.length > 1) {
      cards = filterWinners(cards);
    }

    if (cards.length === 1 && isWinningCard(cards[0]) || isWinningCard(transpose(cards[0]))) {
      const result = getResult(cards[0], bingoNumber);
      console.log(result);
      break;
    }
  }
}

const call = (number, bingoCards) => bingoCards.map(card => card.map(row => row.map(cardNumber => number === cardNumber ? 'X' : cardNumber)));

const isWinningCard = card => card.some(row => row.every(space => space === 'X'));

const filterWinners = (bingoCards) => bingoCards.filter(card => !isWinningCard(card)).map(transpose).filter(card => !isWinningCard(card));

const clone = (card) => (
  [...card.map(row => [...row])]
);

const getResult = (card, number)  => {
  return card.flat().map(x => +x).filter(x => !isNaN(x)).reduce((acc, curr) => acc + curr) * number;
}

main();
  


