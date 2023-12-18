import { describe, expect, test } from 'bun:test';
import { getInput, getFirstAreaOfLagoon, getSecondAreaOfLagoon } from './mod';

describe('Day 18: Lavaduct Lagoon', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				['R', 6],
				['R', 461937],
			],
			[
				['D', 5],
				['D', 56407],
			],
			[
				['L', 2],
				['R', 356671],
			],
			[
				['D', 2],
				['D', 863240],
			],
			[
				['R', 2],
				['R', 367720],
			],
			[
				['D', 2],
				['D', 266681],
			],
			[
				['L', 5],
				['L', 577262],
			],
			[
				['U', 2],
				['U', 829975],
			],
			[
				['L', 1],
				['L', 112010],
			],
			[
				['U', 2],
				['D', 829975],
			],
			[
				['R', 2],
				['L', 491645],
			],
			[
				['U', 3],
				['U', 686074],
			],
			[
				['L', 2],
				['L', 5411],
			],
			[
				['U', 2],
				['U', 500254],
			],
		]);
	});

	const instructions = await getInput('./input_test.txt');

	test('Get first area of lagoon', () => {
		expect(getFirstAreaOfLagoon(instructions)).toBe(62);
	});

	test('Get second area of lagoon', () => {
		expect(getSecondAreaOfLagoon(instructions)).toBe(952408144115);
	});
});
