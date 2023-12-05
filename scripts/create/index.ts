import { getInput, partOne, partTwo } from './mod';

const input = await getInput('./input.txt');

const partOneResult = partOne(input);

console.log('Part 1:', partOneResult, '(Part 1)');

const partTwoResult = partTwo(input);

console.log('Part 2:', partTwoResult, '(Part 2)');
