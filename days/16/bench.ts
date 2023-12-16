import { bench, group } from 'mitata';
import {
	getInput,
	getEnergizedTilesFromTopLeft,
	getEnergizedTilesFromEdges,
} from './mod';

const grid = await getInput('./input.txt');

group({ name: '16: The Floor Will Be Lava', summary: false }, () => {
	bench('Energized tiles from top left', () =>
		getEnergizedTilesFromTopLeft(grid)
	);
	bench('Energized tiles from edges', () => getEnergizedTilesFromEdges(grid));
});
