import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getAmountOfGardenPlotsAfter64Steps,
	getAmountOfGardenPlotsAfter26501365Steps,
	fillGrid,
} from './mod';

describe('Day 21: Step Counter', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[5, 5],
			[
				['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
				['.', '.', '.', '.', '.', '#', '#', '#', '.', '#', '.'],
				['.', '#', '#', '#', '.', '#', '#', '.', '.', '#', '.'],
				['.', '.', '#', '.', '#', '.', '.', '.', '#', '.', '.'],
				['.', '.', '.', '.', '#', '.', '#', '.', '.', '.', '.'],
				['.', '#', '#', '.', '.', '.', '#', '#', '#', '#', '.'],
				['.', '#', '#', '.', '.', '#', '.', '.', '.', '#', '.'],
				['.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.'],
				['.', '#', '#', '.', '#', '.', '#', '#', '#', '#', '.'],
				['.', '#', '#', '.', '.', '#', '#', '.', '#', '#', '.'],
				['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			],
		]);
	});

	const exampleInstructions = await getInput('./input_test.txt');

	test('Fill grid', () => {
		expect(fillGrid(exampleInstructions, 6)).toBe(16);
	});

	const actualInstructions = await getInput('./input.txt');

	test('Get amount of garden plots after 64 steps', () => {
		expect(getAmountOfGardenPlotsAfter64Steps(actualInstructions)).toBe(3_689);
	});

	test('Get amount of garden plots after 26,501,365 steps', () => {
		expect(getAmountOfGardenPlotsAfter26501365Steps(actualInstructions)).toBe(
			610_158_187_362_102
		);
	});
});
