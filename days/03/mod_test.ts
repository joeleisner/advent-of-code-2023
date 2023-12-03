import { describe, expect, test } from 'bun:test';
import { getInput, getSumOfGearRatios, getSumOfPartNumbers } from './mod';

describe('Day 3: Gear Ratios', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			// Parts
			new Map([
				[
					467,
					[
						[
							[0, 0],
							[2, 0],
						],
					],
				],
				[
					114,
					[
						[
							[5, 0],
							[7, 0],
						],
					],
				],
				[
					35,
					[
						[
							[2, 2],
							[3, 2],
						],
					],
				],
				[
					633,
					[
						[
							[6, 2],
							[8, 2],
						],
					],
				],
				[
					617,
					[
						[
							[0, 4],
							[2, 4],
						],
					],
				],
				[
					58,
					[
						[
							[7, 5],
							[8, 5],
						],
					],
				],
				[
					592,
					[
						[
							[2, 6],
							[4, 6],
						],
					],
				],
				[
					755,
					[
						[
							[6, 7],
							[8, 7],
						],
					],
				],
				[
					664,
					[
						[
							[1, 9],
							[3, 9],
						],
					],
				],
				[
					598,
					[
						[
							[5, 9],
							[7, 9],
						],
					],
				],
			]),
			// Symbols
			new Map([
				[
					'*',
					[
						[3, 1],
						[3, 4],
						[5, 8],
					],
				],
				['#', [[6, 3]]],
				['+', [[5, 5]]],
				['$', [[3, 8]]],
			]),
		]);
	});

	const schematic = await getInput('./input_test.txt');

	test('Sum of part numbers', () => {
		expect(getSumOfPartNumbers(schematic)).toBe(4361);
	});

	test('Sum of gear ratios', () => {
		expect(getSumOfGearRatios(schematic)).toBe(467835);
	});
});
