import { getInput, getSumOfHash, getSumOfFocusingPowers } from './mod';

const sequence = await getInput('./input.txt');

const sumOfHash = getSumOfHash(sequence);

console.log('Sum of hash:', sumOfHash, '(Part 1)');

const sumOfFocusingPowers = getSumOfFocusingPowers(sequence);

console.log('Sum of focusing powers:', sumOfFocusingPowers, '(Part 2)');
