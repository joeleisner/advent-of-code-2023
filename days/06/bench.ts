import { bench, group } from 'mitata';
import {
	getInput,
	getMultipliedWaysToWinRaces,
	getMultipliedWaysToWinRace,
} from './mod';

const races = await getInput('./input.txt');

group({ name: '6: Wait For It', summary: false }, () => {
	bench('Get multiplied ways to win races', () =>
		getMultipliedWaysToWinRaces(races)
	);
	bench('Get multiplied ways to win race', () =>
		getMultipliedWaysToWinRace(races)
	);
});
