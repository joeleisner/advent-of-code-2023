import { describe, expect, test } from 'bun:test';
import {
	convertHandToValues,
	getInput,
	getType,
	getTotalWinnings,
	getTotalWinningsWithJokers,
	sortByType,
	withJokers,
	getAmountOfValues,
} from './mod';

describe('Day 7: Camel Cards', async () => {
	test('Convert hand to values', () => {
		expect(convertHandToValues('TJQKA')).toEqual([10, 11, 12, 13, 14]);
		expect(convertHandToValues('12345')).toEqual([1, 2, 3, 4, 5]);
	});

	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[[3, 2, 10, 3, 13], 765],
			[[10, 5, 5, 11, 5], 684],
			[[13, 13, 6, 7, 7], 28],
			[[13, 10, 11, 11, 10], 220],
			[[12, 12, 12, 11, 14], 483],
		]);
	});

	const handBids = await getInput('./input_test.txt');

	test('With jokers', () => {
		expect(handBids.map(withJokers)).toEqual([
			[[3, 2, 10, 3, 13], 765],
			[[10, 5, 5, 0, 5], 684],
			[[13, 13, 6, 7, 7], 28],
			[[13, 10, 0, 0, 10], 220],
			[[12, 12, 12, 0, 14], 483],
		]);
	});

	const handBidsWithJokers = handBids.map(withJokers);

	test('Get amount of values', () => {
		expect(handBids.map(([hand]) => getAmountOfValues(hand))).toEqual([
			[1, 1, 1, 2],
			[1, 1, 3],
			[1, 2, 2],
			[1, 2, 2],
			[1, 1, 3],
		]);
		expect(handBidsWithJokers.map(([hand]) => getAmountOfValues(hand))).toEqual(
			[
				[1, 1, 1, 2],
				[1, 4],
				[1, 2, 2],
				[1, 4],
				[1, 4],
			]
		);
	});

	test('Get type', () => {
		expect(handBids.map(([hand]) => getType(hand))).toEqual([1, 3, 2, 2, 3]);
		expect(handBidsWithJokers.map(([hand]) => getType(hand))).toEqual([
			1, 5, 2, 5, 5,
		]);
	});

	test('Sort by type', () => {
		expect(handBids.sort(sortByType)).toEqual([
			[[3, 2, 10, 3, 13], 765],
			[[13, 10, 11, 11, 10], 220],
			[[13, 13, 6, 7, 7], 28],
			[[10, 5, 5, 11, 5], 684],
			[[12, 12, 12, 11, 14], 483],
		]);
		expect(handBidsWithJokers.sort(sortByType)).toEqual([
			[[3, 2, 10, 3, 13], 765],
			[[13, 13, 6, 7, 7], 28],
			[[10, 5, 5, 0, 5], 684],
			[[12, 12, 12, 0, 14], 483],
			[[13, 10, 0, 0, 10], 220],
		]);
	});

	test('Get total winnings', () => {
		expect(getTotalWinnings(handBids)).toBe(6440);
	});

	test('Get total winnings w/ jokers', () => {
		expect(getTotalWinningsWithJokers(handBids)).toBe(5905);
	});
});
