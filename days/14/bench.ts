import { bench, group } from 'mitata';
import {
	getInput,
	getTotalLoadAfterSlide,
	getTotalLoadAfterABillionCycles,
} from './mod';

const input = await getInput('./input.txt');

group({ name: '14: Parabolic Reflector Dish', summary: false }, () => {
	bench('Total load after slide', () => getTotalLoadAfterSlide(input));
	bench('Total load after a billion cycles', () =>
		getTotalLoadAfterABillionCycles(input)
	);
});
