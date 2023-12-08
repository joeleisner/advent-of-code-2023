import { bench, group } from 'mitata';
import {
	getInput,
	stepsToNavigateTheNetwork,
	stepsToSimultaneouslyNavigateTheNetwork,
} from './mod';

const input = await getInput('./input.txt');

group({ name: '8: Haunted Wasteland', summary: false }, () => {
	bench('Steps to navigate the network', () =>
		stepsToNavigateTheNetwork(input)
	);
	bench('Steps to simultaneously navigate the network', () =>
		stepsToSimultaneouslyNavigateTheNetwork(input)
	);
});
