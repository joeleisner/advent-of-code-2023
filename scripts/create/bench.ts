import { bench, group } from 'mitata';
import { getInput, partOne, partTwo } from './mod';

const input = await getInput('./input.txt');

group({ name: '{{number}}: {{title}}', summary: false }, () => {
	bench('Part 1', () => partOne(input));
	bench('Part 2', () => partTwo(input));
});
