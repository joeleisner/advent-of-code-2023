import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getLoop,
	getStepsToFurthestPointOnLoop,
	getAmountOfEnclosedTiles,
} from './mod';

describe('Day 10: Pipe Maze', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.1.txt')).toEqual([
			[1, 1],
			[
				['.', '.', '.', '.', '.'],
				['.', 'F', '-', '7', '.'],
				['.', '|', '.', '|', '.'],
				['.', 'L', '-', 'J', '.'],
				['.', '.', '.', '.', '.'],
			],
		]);
		expect(await getInput('./input_test.2.txt')).toEqual([
			[0, 2],
			[
				['.', '.', 'F', '7', '.'],
				['.', 'F', 'J', '|', '.'],
				['F', 'J', '.', 'L', '7'],
				['|', 'F', '-', '-', 'J'],
				['L', 'J', '.', '.', '.'],
			],
		]);
	});

	const firstTiles = await getInput('./input_test.1.txt');
	const secondTiles = await getInput('./input_test.2.txt');

	test('Get loop', () => {
		expect(getLoop(firstTiles)).toEqual(
			new Set([
				'[1,1]',
				'[1,2]',
				'[1,3]',
				'[2,3]',
				'[3,3]',
				'[3,2]',
				'[3,1]',
				'[2,1]',
			])
		);
		expect(getLoop(secondTiles)).toEqual(
			new Set([
				'[0,2]',
				'[0,3]',
				'[0,4]',
				'[1,4]',
				'[1,3]',
				'[2,3]',
				'[3,3]',
				'[4,3]',
				'[4,2]',
				'[3,2]',
				'[3,1]',
				'[3,0]',
				'[2,0]',
				'[2,1]',
				'[1,1]',
				'[1,2]',
			])
		);
	});

	test('Get steps to furthest point on loop', () => {
		expect(getStepsToFurthestPointOnLoop(firstTiles)).toBe(4);
		expect(getStepsToFurthestPointOnLoop(secondTiles)).toBe(8);
	});

	const thirdTiles = await getInput('./input_test.3.txt');
	const fourthTiles = await getInput('./input_test.4.txt');
	const fifthTiles = await getInput('./input_test.5.txt');

	test('Get amount of enclosed tiles', () => {
		expect(getAmountOfEnclosedTiles(thirdTiles)).toBe(4);
		expect(getAmountOfEnclosedTiles(fourthTiles)).toBe(8);
		expect(getAmountOfEnclosedTiles(fifthTiles)).toBe(10);
	});
});
