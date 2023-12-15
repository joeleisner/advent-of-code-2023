import { bench, group } from 'mitata';
import { getInput, getSumOfHash, getSumOfFocusingPowers } from './mod';

const sequence = await getInput('./input.txt');

group({ name: '15: Lens Library', summary: false }, () => {
	bench('Sum of hash', () => getSumOfHash(sequence));
	bench('Sum of focusing powers', () => getSumOfFocusingPowers(sequence));
});
