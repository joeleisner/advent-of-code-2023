import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfMinimumCubeSetPower,
	getSumOfPossibleGameIDs,
} from './mod';

const games = await getInput('./input.txt');

group({ name: 'Day 2: Cube Conundrum', summary: false }, () => {
	bench('Sum of possible game IDs', () =>
		getSumOfPossibleGameIDs(
			{
				red: 12,
				green: 13,
				blue: 14,
			},
			games
		)
	);
	bench('Sum of minimum cube set powers', () =>
		getSumOfMinimumCubeSetPower(games)
	);
});
