import { bench, group } from 'mitata';
import {
	getInput,
	getAmountOfGardenPlotsAfter64Steps,
	getAmountOfGardenPlotsAfter26501365Steps,
} from './mod';

const instructions = await getInput('./input.txt');

group({ name: '21: Step Counter', summary: false }, () => {
	bench('Amount of garden plots after 64 steps', () =>
		getAmountOfGardenPlotsAfter64Steps(instructions)
	);
	bench('Amount of garden plots after 26,501,365 steps', () =>
		getAmountOfGardenPlotsAfter26501365Steps(instructions)
	);
});
