import {
	getInput,
	getMinimalHeatLossWithRegularCrucibles,
	getMinimalHeatLossWithUltraCrucibles,
} from './mod';

const grid = await getInput('./input.txt');

const minimalHeatLossWithRegularCrucibles =
	getMinimalHeatLossWithRegularCrucibles(grid);

console.log(
	'Minimal heat loss with regular crucibles:',
	minimalHeatLossWithRegularCrucibles,
	'(Part 1)'
);

const minimalHeatLossWithUltraCrucibles =
	getMinimalHeatLossWithUltraCrucibles(grid);

console.log(
	'Minimal heat loss with ultra crucibles:',
	minimalHeatLossWithUltraCrucibles,
	'(Part 2)'
);
