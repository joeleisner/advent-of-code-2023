import {
	getInput,
	getStepsToFurthestPointOnLoop,
	getAmountOfEnclosedTiles,
} from './mod';

const tiles = await getInput('./input.txt');

const stepsToFurthestPointOnLoop = getStepsToFurthestPointOnLoop(tiles);

console.log(
	'Steps to furthest point on loop:',
	stepsToFurthestPointOnLoop,
	'(Part 1)'
);

const amountOfEnclosedTiles = getAmountOfEnclosedTiles(tiles);

console.log('Amount of enclosed tiles:', amountOfEnclosedTiles, '(Part 2)');
