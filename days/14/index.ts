import {
	getInput,
	getTotalLoadAfterSlide,
	getTotalLoadAfterABillionCycles,
} from './mod';

const grid = await getInput('./input.txt');

const totalLoadAfterSlide = getTotalLoadAfterSlide(grid);

console.log('Total load after slide:', totalLoadAfterSlide, '(Part 1)');

const totalLoadAfterABillionCycles = getTotalLoadAfterABillionCycles(grid);

console.log(
	'Total load after a billion cycles:',
	totalLoadAfterABillionCycles,
	'(Part 2)'
);
