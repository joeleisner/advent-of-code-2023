import {
	getInput,
	getSumOfArrangements,
	getSumOfUnfoldedArrangements,
} from './mod';

const records = await getInput('./input.txt');

const sumOfArrangements = getSumOfArrangements(records);

console.log('Sum of arrangements:', sumOfArrangements, '(Part 1)');

const sumOfUnfoldedArrangements = getSumOfUnfoldedArrangements(records);

console.log(
	'Sum of unfolded arrangements:',
	sumOfUnfoldedArrangements,
	'(Part 2)'
);
