import {
	getInput,
	getSumOfPredictedNextValues,
	getSumOfPredictedPreviousValues,
} from './mod';

const histories = await getInput('./input.txt');

const sumOfPredictedNextValues = getSumOfPredictedNextValues(histories);

console.log(
	'Sum of predicted next values:',
	sumOfPredictedNextValues,
	'(Part 1)'
);

const sumOfPredictedPreviousValues = getSumOfPredictedPreviousValues(histories);

console.log(
	'Sum of predicted previous values:',
	sumOfPredictedPreviousValues,
	'(Part 2)'
);
