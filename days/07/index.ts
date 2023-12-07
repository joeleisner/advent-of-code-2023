import { getInput, getTotalWinnings, getTotalWinningsWithJokers } from './mod';

const input = await getInput('./input.txt');

const partOneResult = getTotalWinnings(input);

console.log('Get total winnings:', partOneResult, '(Part 1)');

const partTwoResult = getTotalWinningsWithJokers(input);

console.log('Get total winnings w/ jokers:', partTwoResult, '(Part 2)');
