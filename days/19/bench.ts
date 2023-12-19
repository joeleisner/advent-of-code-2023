import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfAcceptedPartsRatings,
	getAmountOfDistinctRatingsCombinations,
} from './mod';

const system = await getInput('./input.txt');

group({ name: '19: Aplenty', summary: false }, () => {
	bench('Sum of accepted parts ratings', () =>
		getSumOfAcceptedPartsRatings(system)
	);
	bench('Amount of distinct ratings combinations', () =>
		getAmountOfDistinctRatingsCombinations(system)
	);
});
