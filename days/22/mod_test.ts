import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getAmountOfBricksThatCanBeDisintegrated,
	getAmountOfBricksThatWouldFall,
} from './mod';

describe('Day 22: Sand Slabs', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[1, 0, 1, 1, 2, 1],
			[0, 0, 2, 2, 0, 2],
			[0, 2, 3, 2, 2, 3],
			[0, 0, 4, 0, 2, 4],
			[2, 0, 5, 2, 2, 5],
			[0, 1, 6, 2, 1, 6],
			[1, 1, 8, 1, 1, 9],
		]);
	});

	const bricks = await getInput('./input_test.txt');

	test('Get amount of bricks that can be disintegrated', () => {
		expect(getAmountOfBricksThatCanBeDisintegrated(bricks)).toBe(5);
	});

	test('Get amount of bricks that would fall', () => {
		expect(getAmountOfBricksThatWouldFall(bricks)).toBe(7);
	});
});
