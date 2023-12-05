import {
	getInput,
	getLowestLocationNumberFromSeeds,
	getLowestLocationNumberFromSeedRanges,
} from './mod';

const input = await getInput('./input.txt');

const lowestLocationNumberFromSeeds = getLowestLocationNumberFromSeeds(input);

console.log(
	'Get lowest location number from seeds:',
	lowestLocationNumberFromSeeds,
	'(Part 1)'
);

const lowestLocationNumberFromSeedRanges =
	getLowestLocationNumberFromSeedRanges(input);

console.log(
	'Get lowest location number from seed ranges:',
	lowestLocationNumberFromSeedRanges,
	'(Part 2)'
);
