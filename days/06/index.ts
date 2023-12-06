import {
	getInput,
	getMultipliedWaysToWinRaces,
	getMultipliedWaysToWinRace,
} from './mod';

const input = await getInput('./input.txt');

const multipliedWaysToWinRaces = getMultipliedWaysToWinRaces(input);

console.log(
	'Get multiplied ways to win races:',
	multipliedWaysToWinRaces,
	'(Part 1)'
);

const multipliedWaysToWinRace = getMultipliedWaysToWinRace(input);

console.log(
	'Get multiplied ways to win race:',
	multipliedWaysToWinRace,
	'(Part 2)'
);
