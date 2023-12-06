import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getPoints,
	getTotalScratchcards,
	getWinningNumberAmount,
} from './mod';

describe('Day 4: Scratchcards', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				[41, 48, 83, 86, 17],
				[83, 86, 6, 31, 17, 9, 48, 53],
			],
			[
				[13, 32, 20, 16, 61],
				[61, 30, 68, 82, 17, 32, 24, 19],
			],
			[
				[1, 21, 53, 59, 44],
				[69, 82, 63, 72, 16, 21, 14, 1],
			],
			[
				[41, 92, 73, 84, 69],
				[59, 84, 76, 51, 58, 5, 54, 83],
			],
			[
				[87, 83, 26, 28, 32],
				[88, 30, 70, 12, 93, 22, 82, 36],
			],
			[
				[31, 18, 13, 56, 72],
				[74, 77, 10, 23, 35, 67, 36, 11],
			],
		]);
	});

	const cards = await getInput('./input_test.txt');

	test('Get winning numbers', () => {
		expect(cards.map(getWinningNumberAmount)).toEqual([4, 2, 2, 1, 0, 0]);
	});

	test('Get points', () => {
		expect(getPoints(cards)).toBe(13);
	});

	test('Get total scratchcards', () => {
		expect(getTotalScratchcards(cards)).toBe(30);
	});
});