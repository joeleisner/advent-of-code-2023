import { describe, expect, test } from 'bun:test';
import { getInput, getSumOfHash, getSumOfFocusingPowers } from './mod';

describe('Day 15: Lens Library', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			'rn=1',
			'cm-',
			'qp=3',
			'cm=2',
			'qp-',
			'pc=4',
			'ot=9',
			'ab=5',
			'pc-',
			'pc=6',
			'ot=7',
		]);
	});

	const sequence = await getInput('./input_test.txt');

	test('Get sum of hash', () => {
		expect(getSumOfHash(sequence)).toBe(1320);
	});

	test('Get sum of focusing powers', () => {
		expect(getSumOfFocusingPowers(sequence)).toBe(145);
	});
});
