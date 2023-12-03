import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getMinimumCubeSetPowers,
	getPossibleGameIDs,
	getCubeSet,
} from './mod';

describe('Day 2: Cube Conundrum', async () => {
	test('Match cubes', () => {
		const set = '8 green, 6 blue, 20 red';
		expect(getCubeSet(set)).toEqual({
			green: 8,
			blue: 6,
			red: 20,
		});
	});

	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				{
					blue: 3,
					red: 4,
					green: 0,
				},
				{
					red: 1,
					green: 2,
					blue: 6,
				},
				{
					green: 2,
					red: 0,
					blue: 0,
				},
			],
			[
				{
					blue: 1,
					green: 2,
					red: 0,
				},
				{
					green: 3,
					blue: 4,
					red: 1,
				},
				{
					green: 1,
					blue: 1,
					red: 0,
				},
			],
			[
				{
					green: 8,
					blue: 6,
					red: 20,
				},
				{
					blue: 5,
					red: 4,
					green: 13,
				},
				{
					green: 5,
					red: 1,
					blue: 0,
				},
			],
			[
				{
					green: 1,
					red: 3,
					blue: 6,
				},
				{
					green: 3,
					red: 6,
					blue: 0,
				},
				{
					green: 3,
					blue: 15,
					red: 14,
				},
			],
			[
				{
					red: 6,
					blue: 1,
					green: 3,
				},
				{
					blue: 2,
					red: 1,
					green: 2,
				},
			],
		]);
	});

	const games = await getInput('./input_test.txt');

	test('Get possible game IDs', () => {
		expect(getPossibleGameIDs({ red: 12, green: 13, blue: 14 }, games)).toEqual(
			[1, 2, 5]
		);
	});

	test('Get minimum cube set powers', () => {
		expect(getMinimumCubeSetPowers(games)).toEqual([48, 12, 1560, 630, 36]);
	});
});
