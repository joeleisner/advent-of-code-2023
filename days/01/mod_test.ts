import { describe, expect, test } from 'bun:test';
import { getSumOfCalibrationValues, getInput, matchDigits } from './mod';

describe('Day 1: Trebuchet?!', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.1.txt')).toEqual([
			'1abc2',
			'pqr3stu8vwx',
			'a1b2c3d4e5f',
			'treb7uchet',
		]);
		expect(await getInput('./input_test.2.txt')).toEqual([
			'two1nine',
			'eightwothree',
			'abcone2threexyz',
			'xtwone3four',
			'4nineeightseven2',
			'zoneight234',
			'7pqrstsixteen',
		]);
	});

	test('Match digits', () => {
		expect(matchDigits('1two3four', false)).toEqual(['1', '3']);
		expect(matchDigits('1two3four', true)).toEqual(['1', '2', '3', '4']);
	});

	const firstCalibrations = await getInput('./input_test.1.txt');
	const secondCalibrations = await getInput('./input_test.2.txt');

	test('Get calibration values', () => {
		expect(getSumOfCalibrationValues(firstCalibrations, false)).toBe(142);
		expect(getSumOfCalibrationValues(secondCalibrations, true)).toBe(281);
	});
});
