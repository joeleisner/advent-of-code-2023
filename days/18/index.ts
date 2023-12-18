import { getInput, getFirstAreaOfLagoon, getSecondAreaOfLagoon } from './mod';

const instructions = await getInput('./input.txt');

const firstAreaOfLagoon = getFirstAreaOfLagoon(instructions);

console.log('First area of lagoon:', firstAreaOfLagoon, '(Part 1)');

const secondAreaOfLagoon = getSecondAreaOfLagoon(instructions);

console.log('Second area of lagoon:', secondAreaOfLagoon, '(Part 2)');
