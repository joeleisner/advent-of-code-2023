import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfArrangements,
	getSumOfUnfoldedArrangements,
} from './mod';

const records = await getInput('./input.txt');

group({ name: '12: Hot Springs', summary: false }, () => {
	bench('Sum of arrangements', () => getSumOfArrangements(records, true));
	bench('Sum of unfolded arrangements', () =>
		getSumOfUnfoldedArrangements(records, true)
	);
});
