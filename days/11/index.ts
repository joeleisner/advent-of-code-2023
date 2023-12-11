import {
	getInput,
	getSumOfShortestPathsExpandedByTwo,
	getSumOfShortestPathsExpandedByOneMillion,
} from './mod';

const grid = await getInput('./input.txt');

const sumOfShortestPathsExpandedByTwo =
	getSumOfShortestPathsExpandedByTwo(grid);

console.log(
	'Sum of shortest paths expanded by two:',
	sumOfShortestPathsExpandedByTwo,
	'(Part 1)'
);

const sumOfShortestPathsExpandedByOneMillion =
	getSumOfShortestPathsExpandedByOneMillion(grid);

console.log(
	'Sum of shortest paths expanded by one million:',
	sumOfShortestPathsExpandedByOneMillion,
	'(Part 2)'
);
