import {
	getInput,
	getMultipliedPulses,
	getFewestNumberOfButtonPresses,
} from './mod';

const modules = await getInput('./input.txt');

const multipliedPulses = getMultipliedPulses(modules);

console.log('Multiplied pulses:', multipliedPulses, '(Part 1)');

const fewestNumberOfButtonPresses = getFewestNumberOfButtonPresses(modules);

console.log(
	'Fewest number of button presses:',
	fewestNumberOfButtonPresses,
	'(Part 2)'
);
