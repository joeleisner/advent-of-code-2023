import { bench, group } from 'mitata';
import {
	getInput,
	getStepsToFurthestPointOnLoop,
	getAmountOfEnclosedTiles,
} from './mod';

const tiles = await getInput('./input.txt');

group({ name: '10: Pipe Maze', summary: false }, () => {
	bench('Steps to furthest point on loop', () =>
		getStepsToFurthestPointOnLoop(tiles)
	);
	bench('Amount of enclosed tiles', () => getAmountOfEnclosedTiles(tiles));
});
