import { getInput, getPoints, getTotalScratchcards } from './mod';

const cards = await getInput('./input.txt');

const points = getPoints(cards);

console.log('Total points:', points, '(Part 1)');

const totalScratchCards = getTotalScratchcards(cards);

console.log('Total scratchcards:', totalScratchCards, '(Part 2)');
