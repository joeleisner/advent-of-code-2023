import { getInput, getMultipliedWinsOfRaces, getWinsOfRace } from './mod';

const input = await getInput('./input.txt');

const multipliedWaysToWinRaces = getMultipliedWinsOfRaces(input);

console.log(
	'Get multiplied wins of races:',
	multipliedWaysToWinRaces,
	'(Part 1)'
);

const multipliedWaysToWinRace = getWinsOfRace(input);

console.log('Get wins of race:', multipliedWaysToWinRace, '(Part 2)');
