import { sumAll } from '../../lib/math';
import { getInput, getMinimumCubeSetPowers, getPossibleGameIDs } from './mod';

const games = await getInput('./input.txt');

const possibleGameIds = getPossibleGameIDs(
	{
		red: 12,
		green: 13,
		blue: 14,
	},
	games
);

console.log('Sum of possible game IDs:', sumAll(possibleGameIds), '(Part 1)');

const minimumCubeSetPowers = getMinimumCubeSetPowers(games);

console.log(
	'Sum of minimum cub set powers:',
	sumAll(minimumCubeSetPowers),
	'(Part 2)'
);
