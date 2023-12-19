import {
	getInput,
	getSumOfAcceptedPartsRatings,
	getAmountOfDistinctRatingsCombinations,
} from './mod';

const system = await getInput('./input.txt');

const sumOfAcceptedPartsRatings = getSumOfAcceptedPartsRatings(system);

console.log(
	'Sum of accepted parts ratings:',
	sumOfAcceptedPartsRatings,
	'(Part 1)'
);

const amountOfDistinctRatingsCombinations =
	getAmountOfDistinctRatingsCombinations(system);

console.log(
	'Amount of distinct ratings combinations:',
	amountOfDistinctRatingsCombinations,
	'(Part 2)'
);
