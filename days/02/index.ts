import {
	getInput,
	getSumOfMinimumCubeSetPower,
	getSumOfPossibleGameIDs,
} from './mod';

const games = await getInput('./input.txt');

const sumOfPossibleGameIds = getSumOfPossibleGameIDs(
	{
		red: 12,
		green: 13,
		blue: 14,
	},
	games
);

console.log('Sum of possible game IDs:', sumOfPossibleGameIds, '(Part 1)');

const sumOfMinimumCubeSetPowers = getSumOfMinimumCubeSetPower(games);

console.log(
	'Sum of minimum cub set powers:',
	sumOfMinimumCubeSetPowers,
	'(Part 2)'
);
