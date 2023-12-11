import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfShortestPathsExpandedByTwo,
	getSumOfShortestPathsExpandedByOneMillion,
} from './mod';

const grid = await getInput('./input.txt');

group({ name: '11: Cosmic Expansion', summary: false }, () => {
	bench('Sum of shortest paths expanded by two', () =>
		getSumOfShortestPathsExpandedByTwo(grid)
	);
	bench('Sum of shortest paths expanded by one million', () =>
		getSumOfShortestPathsExpandedByOneMillion(grid)
	);
});
