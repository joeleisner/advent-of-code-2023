import { bench, group } from 'mitata';
import { getInput, getPoints, getTotalScratchcards } from './mod';

const cards = await getInput('./input.txt');

group({ name: 'Day 4: Scratchcards', summary: false }, () => {
	bench('Total points', () => getPoints(cards));
	bench('Total scratchcards', () => getTotalScratchcards(cards));
});
