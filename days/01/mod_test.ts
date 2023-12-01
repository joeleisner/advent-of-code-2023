import { describe, expect, test } from 'bun:test';
import { getCalibrationValues, getInput } from './mod';

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

	const firstCalibrations = await getInput('./input_test.1.txt');

	test('Get calibration values (w/o spelled out numbers)', () => {
		expect(getCalibrationValues(firstCalibrations, false)).toEqual([
			12, 38, 15, 77,
		]);
	});

	const secondCalibrations = await getInput('./input_test.2.txt');

	test('Get calibration values (w/ spelled out numbers):', () => {
		expect(getCalibrationValues(secondCalibrations, true)).toEqual([
			29, 83, 13, 24, 42, 14, 76,
		]);
	});
});
