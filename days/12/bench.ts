import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfArrangements,
	getSumOfUnfoldedArrangements,
} from './mod';

const input = await getInput('./input.txt');

group({ name: '12: Hot Springs', summary: false }, () => {
	bench('Sum of arrangements', () => getSumOfArrangements(input));
	bench('Sum of unfolded arrangements', () =>
		getSumOfUnfoldedArrangements(input)
	);
});
