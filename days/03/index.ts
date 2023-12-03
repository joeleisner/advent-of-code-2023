import { getInput, getSumOfGearRatios, getSumOfPartNumbers } from './mod';

const schematic = await getInput('./input.txt');

const sumOfPartNumbers = getSumOfPartNumbers(schematic);

console.log('Sum of part numbers:', sumOfPartNumbers, '(Part 1)');

const sumOfGearRatios = getSumOfGearRatios(schematic);

console.log('Sum of gear ratios:', sumOfGearRatios, '(Part 2)');
