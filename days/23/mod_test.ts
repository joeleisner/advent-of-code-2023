import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getLongestPathWithSlopes,
	getLongestPathWithoutSlopes,
} from './mod';

describe('Day 23: A Long Walk', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				[
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'>',
					'.',
					'>',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'v',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'v',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'.',
					'>',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'v',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
				],
				[
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'v',
					'#',
				],
				[
					'#',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'>',
					'.',
					'#',
				],
				[
					'#',
					'.',
					'#',
					'.',
					'#',
					'v',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'v',
					'#',
					'#',
					'#',
					'.',
					'#',
					'#',
					'#',
					'v',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'>',
					'.',
					'#',
					'.',
					'.',
					'.',
					'>',
					'.',
					'>',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'#',
					'#',
					'v',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'v',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
				],
				[
					'#',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'v',
					'#',
					'#',
					'#',
					'#',
					'#',
					'v',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'#',
					'.',
					'>',
					'.',
					'>',
					'.',
					'#',
					'.',
					'>',
					'.',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'#',
					'#',
					'.',
					'#',
					'.',
					'#',
					'v',
					'#',
					'#',
					'#',
				],
				[
					'#',
					'.',
					'.',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'#',
					'#',
					'#',
					'.',
					'.',
					'.',
					'#',
					'.',
					'.',
					'.',
					'#',
				],
				[
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'#',
				],
			],
			[0, 1],
			[22, 21],
		]);
	});

	const input = await getInput('./input_test.txt');

	test('Get longest path with slopes', () => {
		expect(getLongestPathWithSlopes(input)).toBe(94);
	});

	test('Get longest path without slopes', () => {
		expect(getLongestPathWithoutSlopes(input)).toBe(154);
	});
});