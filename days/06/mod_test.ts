import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getMultipliedWaysToWinRaces,
	getMultipliedWaysToWinRace,
} from './mod';

describe('Day 6: Wait For It', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[7, 9],
			[15, 40],
			[30, 200],
		]);
	});

	const input = await getInput('./input_test.txt');

	test('Get multiplied ways to win races', () => {
		expect(getMultipliedWaysToWinRaces(input)).toBe(288);
	});

	test('Get multiplied wasy to win race', () => {
		expect(getMultipliedWaysToWinRace(input)).toBe(71503);
	});
});
