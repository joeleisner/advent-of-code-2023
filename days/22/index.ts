import {
	getInput,
	getAmountOfBricksThatCanBeDisintegrated,
	getAmountOfBricksThatWouldFall,
} from './mod';

const bricks = await getInput('./input.txt');

const amountOfBricksThatCanBeDisintegrated =
	getAmountOfBricksThatCanBeDisintegrated(bricks);

console.log(
	'Amount of bricks that can be disintegrated:',
	amountOfBricksThatCanBeDisintegrated,
	'(Part 1)'
);

const amountOfBricksThatWouldFall = getAmountOfBricksThatWouldFall(bricks);

console.log(
	'Amount of bricks that would fall:',
	amountOfBricksThatWouldFall,
	'(Part 2)'
);
