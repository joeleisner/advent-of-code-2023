import { bench, group } from 'mitata';
import {
	getInput,
	getLowestLocationNumberFromSeeds,
	getLowestLocationNumberFromSeedRanges,
} from './mod';

const almanac = await getInput('./input.txt');

group({ name: '5: If You Give A Seed A Fertilizer', summary: false }, () => {
	bench('Get lowest location number from seeds', () =>
		getLowestLocationNumberFromSeeds(almanac)
	);
	bench('Get lowest location number from seed ranges', () =>
		getLowestLocationNumberFromSeedRanges(almanac)
	);
});
