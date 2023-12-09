import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getSumOfPredictedNextValues,
	getSumOfPredictedPreviousValues,
	predictNextValue,
} from './mod';

describe('Day 9: Mirage Maintenance', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[0, 3, 6, 9, 12, 15],
			[1, 3, 6, 10, 15, 21],
			[10, 13, 16, 21, 30, 45],
		]);
	});

	const histories = await getInput('./input_test.txt');

	test('Predict next value', () => {
		expect(histories.map(predictNextValue)).toEqual([18, 28, 68]);
	});

	test('Sum of predicted next values', () => {
		expect(getSumOfPredictedNextValues(histories)).toBe(114);
	});

	test('Sum of predicted previous values', () => {
		expect(getSumOfPredictedPreviousValues(histories)).toBe(2);
	});
});
