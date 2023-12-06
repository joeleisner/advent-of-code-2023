import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getMultipliedWinsOfRaces,
	getWinsOfRace,
	getWins,
} from './mod';

describe('Day 6: Wait For It', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[7, 9],
			[15, 40],
			[30, 200],
		]);
	});

	const races = await getInput('./input_test.txt');

	test('Get wins', () => {
		expect(races.map(getWins)).toEqual([4, 8, 9]);
	});

	test('Get multiplied wins of races', () => {
		expect(getMultipliedWinsOfRaces(races)).toBe(288);
	});

	test('Get wins of race', () => {
		expect(getWinsOfRace(races)).toBe(71503);
	});
});
