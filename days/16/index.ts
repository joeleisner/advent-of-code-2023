import {
	getInput,
	getEnergizedTilesFromTopLeft,
	getEnergizedTilesFromEdges,
} from './mod';

const grid = await getInput('./input.txt');

const energizedTilesFromTopLeft = getEnergizedTilesFromTopLeft(grid);

console.log(
	'Energized tiles from top left:',
	energizedTilesFromTopLeft,
	'(Part 1)'
);

const energizedTilesFromEdges = getEnergizedTilesFromEdges(grid);

console.log('Energized tiles from edges:', energizedTilesFromEdges, '(Part 2)');
