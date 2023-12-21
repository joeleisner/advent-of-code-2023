import {
	getInput,
	getAmountOfGardenPlotsAfter64Steps,
	getAmountOfGardenPlotsAfter26501365Steps,
} from './mod';

const instructions = await getInput('./input.txt');

const amountOfGardenPlotsAfter64Steps =
	getAmountOfGardenPlotsAfter64Steps(instructions);

console.log(
	'Amount of garden plots after 64 steps:',
	amountOfGardenPlotsAfter64Steps,
	'(Part 1)'
);

const amountOfGardenPlotsAfter26501365Steps =
	getAmountOfGardenPlotsAfter26501365Steps(instructions);

console.log(
	'Amount of garden plots after 26,501,365 steps:',
	amountOfGardenPlotsAfter26501365Steps,
	'(Part 2)'
);
