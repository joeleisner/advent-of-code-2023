import { bench, group } from 'mitata';
import {
	getInput,
	getMultipliedWinsOfRaces,
	getWinsOfRace,
	getWins,
} from './mod';

const races = await getInput('./input.txt');

group({ name: '6: Wait For It', summary: false }, () => {
	bench('Get wins', () => {
		races.map(getWins);
	});
	bench('Get multiplied wins of races', () => getMultipliedWinsOfRaces(races));
	bench('Get wins of race', () => getWinsOfRace(races));
});
