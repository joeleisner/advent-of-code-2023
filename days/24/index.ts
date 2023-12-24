import { getInput, getIntersections, getStartingCoordinateSum } from './mod';

const hailstones = await getInput('./input.txt');

const intersections = getIntersections(hailstones);

console.log('Intersections:', intersections, '(Part 1)');

const startingCoordinateSum = await getStartingCoordinateSum(hailstones);

console.log('Starting coordinate sum:', startingCoordinateSum, '(Part 2)');
