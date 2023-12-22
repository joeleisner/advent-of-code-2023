import { bench, group } from 'mitata';
import {
	getInput,
	getAmountOfBricksThatCanBeDisintegrated,
	getAmountOfBricksThatWouldFall,
} from './mod';

const bricks = await getInput('./input.txt');

group({ name: '22: Sand Slabs', summary: false }, () => {
	bench('Amount of bricks that can be disintegrated', () =>
		getAmountOfBricksThatCanBeDisintegrated(bricks)
	);
	bench('Amount of bricks that would fall', () =>
		getAmountOfBricksThatWouldFall(bricks)
	);
});
