import { describe, expect, test } from 'bun:test';
import {
	arrangements,
	getInput,
	getSumOfArrangements,
	getSumOfUnfoldedArrangements,
	unfold,
} from './mod';

describe('Day 12: Hot Springs', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				['?', '?', '?', '.', '#', '#', '#'],
				[1, 1, 3],
			],
			[
				['.', '?', '?', '.', '.', '?', '?', '.', '.', '.', '?', '#', '#', '.'],
				[1, 1, 3],
			],
			[
				[
					'?',
					'#',
					'?',
					'#',
					'?',
					'#',
					'?',
					'#',
					'?',
					'#',
					'?',
					'#',
					'?',
					'#',
					'?',
				],
				[1, 3, 1, 6],
			],
			[
				['?', '?', '?', '?', '.', '#', '.', '.', '.', '#', '.', '.', '.'],
				[4, 1, 1],
			],
			[
				[
					'?',
					'?',
					'?',
					'?',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
					'.',
					'#',
					'#',
					'#',
					'#',
					'#',
					'.',
				],
				[1, 6, 5],
			],
			[
				['?', '#', '#', '#', '?', '?', '?', '?', '?', '?', '?', '?'],
				[3, 2, 1],
			],
		]);
	});

	const records = await getInput('./input_test.txt');

	test('Arrangements', () => {
		expect(arrangements(records.at(-1)!)).toBe(10);
		expect(arrangements(unfold(records.at(-1)!))).toBe(506250);
	});

	test('Get sum of arrangements', () => {
		expect(getSumOfArrangements(records)).toBe(21);
	});

	test('Unfold', () => {
		expect(unfold(records.at(0)!)).toEqual([
			[
				'?',
				'?',
				'?',
				'.',
				'#',
				'#',
				'#',
				'?',
				'?',
				'?',
				'?',
				'.',
				'#',
				'#',
				'#',
				'?',
				'?',
				'?',
				'?',
				'.',
				'#',
				'#',
				'#',
				'?',
				'?',
				'?',
				'?',
				'.',
				'#',
				'#',
				'#',
				'?',
				'?',
				'?',
				'?',
				'.',
				'#',
				'#',
				'#',
			],
			[1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3],
		]);
	});

	test('Get sum of unfolded arrangements', () => {
		expect(getSumOfUnfoldedArrangements(records)).toBe(525152);
	});
});
