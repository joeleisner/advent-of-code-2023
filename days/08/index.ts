import {
	getInput,
	stepsToNavigateTheNetwork,
	stepsToSimultaneouslyNavigateTheNetwork,
} from './mod';

const input = await getInput('./input.txt');

const partOneResult = stepsToNavigateTheNetwork(input);

console.log('Steps to navigate the network:', partOneResult, '(Part 1)');

const partTwoResult = stepsToSimultaneouslyNavigateTheNetwork(input);

console.log(
	'Steps to simultaneously navigate the network:',
	partTwoResult,
	'(Part 2)'
);
