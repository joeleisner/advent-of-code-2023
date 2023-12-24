import { bench, group } from 'mitata';
import { getInput, getIntersections, getStartingCoordinateSum } from './mod';

const hailstones = await getInput('./input.txt');

group({ name: '24: Never Tell Me The Odds', summary: false }, () => {
	bench('Intersections', () => getIntersections(hailstones));
	bench('Starting coordinate sum', () => getStartingCoordinateSum(hailstones));
});
