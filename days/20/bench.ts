import { bench, group } from 'mitata';
import {
	getInput,
	getMultipliedPulses,
	getFewestNumberOfButtonPresses,
} from './mod';

const input = await getInput('./input.txt');

group({ name: '20: Pulse Propagation', summary: false }, () => {
	bench('Multiplied pulses', () => getMultipliedPulses(input));
	bench('Fewest number of button presses', () =>
		getFewestNumberOfButtonPresses(input)
	);
});
