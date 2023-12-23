import { bench, group } from 'mitata';
import {
	getInput,
	getLongestPathWithSlopes,
	getLongestPathWithoutSlopes,
} from './mod';

const input = await getInput('./input.txt');

group({ name: '23: A Long Walk', summary: false }, () => {
	bench('Longest path with slopes', () => getLongestPathWithSlopes(input));
	bench('Longest path without slopes', () =>
		getLongestPathWithoutSlopes(input)
	);
});
