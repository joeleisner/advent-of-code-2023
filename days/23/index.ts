import {
	getInput,
	getLongestPathWithSlopes,
	getLongestPathWithoutSlopes,
} from './mod';

const input = await getInput('./input.txt');

const longestPathWithSlopes = getLongestPathWithSlopes(input);

console.log('Longest path with slopes:', longestPathWithSlopes, '(Part 1)');

const longestPathWithoutSlopes = getLongestPathWithoutSlopes(input);

console.log(
	'Longest path without slopes:',
	longestPathWithoutSlopes,
	'(Part 2)'
);
