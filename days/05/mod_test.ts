import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getLowestLocationNumberFromSeeds,
	getLowestLocationNumberFromSeedRanges,
} from './mod';

describe('Day 5: If You Give A Seed A Fertilizer', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			// Seeds
			[79, 14, 55, 13],
			// Maps
			[
				[
					[
						[98, 99],
						[50, 51],
					],
					[
						[50, 97],
						[52, 99],
					],
				],
				[
					[
						[15, 51],
						[0, 36],
					],
					[
						[52, 53],
						[37, 38],
					],
					[
						[0, 14],
						[39, 53],
					],
				],
				[
					[
						[53, 60],
						[49, 56],
					],
					[
						[11, 52],
						[0, 41],
					],
					[
						[0, 6],
						[42, 48],
					],
					[
						[7, 10],
						[57, 60],
					],
				],
				[
					[
						[18, 24],
						[88, 94],
					],
					[
						[25, 94],
						[18, 87],
					],
				],
				[
					[
						[77, 99],
						[45, 67],
					],
					[
						[45, 63],
						[81, 99],
					],
					[
						[64, 76],
						[68, 80],
					],
				],
				[
					[
						[69, 69],
						[0, 0],
					],
					[
						[0, 68],
						[1, 69],
					],
				],
				[
					[
						[56, 92],
						[60, 96],
					],
					[
						[93, 96],
						[56, 59],
					],
				],
			],
		]);
	});

	const almanac = await getInput('./input_test.txt');

	test('Get lowest location number from seeds', () => {
		expect(getLowestLocationNumberFromSeeds(almanac)).toBe(35);
	});

	test('Get lowest location number from seed ranges', () => {
		expect(getLowestLocationNumberFromSeedRanges(almanac)).toBe(46);
	});
});
