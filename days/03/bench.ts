import { bench, group } from 'mitata';
import { getInput, getSumOfGearRatios, getSumOfPartNumbers } from './mod';

const schematic = await getInput('./input.txt');

group({ name: 'Day 3: Gear Ratios', summary: false }, () => {
	bench('Sum of part numbers', () => getSumOfPartNumbers(schematic));
	bench('Sum of gear ratios', () => getSumOfGearRatios(schematic));
});
