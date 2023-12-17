import { bench, group } from 'mitata';
import {
	getInput,
	getMinimalHeatLossWithRegularCrucibles,
	getMinimalHeatLossWithUltraCrucibles,
} from './mod';

const grid = await getInput('./input.txt');

group({ name: '17: Clumsy Crucible', summary: false }, () => {
	bench('Minimal heat loss with regular crucibles', () =>
		getMinimalHeatLossWithRegularCrucibles(grid)
	);
	bench('Minimal heat loss with ultra crucibles', () =>
		getMinimalHeatLossWithUltraCrucibles(grid)
	);
});
