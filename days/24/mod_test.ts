import { describe, expect, test } from 'bun:test';
import { getInput, getIntersections, getStartingCoordinateSum } from './mod';

describe('Day 24: Never Tell Me The Odds', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[19, 13, 30, -2, 1, -2],
			[18, 19, 22, -1, -1, -2],
			[20, 25, 34, -2, -2, -4],
			[12, 31, 28, -1, -2, -1],
			[20, 19, 15, 1, -5, -3],
		]);
	});

	const hailstones = await getInput('./input_test.txt');

	test('Get intersections', () => {
		expect(getIntersections(hailstones, [7, 27])).toBe(2);
	});

	test('Get starting coordinate sum', async () => {
		expect(await getStartingCoordinateSum(hailstones)).toBe(47);
	});
});
