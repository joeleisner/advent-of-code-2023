import { bench, group } from 'mitata';
import { getInput, getFirstAreaOfLagoon, getSecondAreaOfLagoon } from './mod';

const instructions = await getInput('./input.txt');

group({ name: '18: Lavaduct Lagoon', summary: false }, () => {
	bench('First area of lagoon', () => getFirstAreaOfLagoon(instructions));
	bench('Second area of lagoon', () => getSecondAreaOfLagoon(instructions));
});
