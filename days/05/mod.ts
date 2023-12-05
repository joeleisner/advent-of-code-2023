import { inRange } from '../../lib/math';

type Range = [start: number, end: number];

type MapRange = [source: Range, destination: Range];

type Almanac = [seeds: number[], maps: MapRange[][]];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const [rawSeeds, ...rawMaps] = text.split('\n\n');

	const seeds = [...rawSeeds.matchAll(/\d+/g)].map(Number);

	const maps: MapRange[][] = [];

	for (const rawMap of rawMaps) {
		const ranges = [...rawMap.matchAll(/(\d+) (\d+) (\d+)/g)].map((range) => {
			const [dest, src, length] = range.slice(1).map(Number);
			return [
				[src, src + (length - 1)],
				[dest, dest + (length - 1)],
			];
		}) as MapRange[];

		maps.push(ranges);
	}

	return [seeds, maps] as Almanac;
}

export function pipe(value: number, maps: MapRange[][]) {
	for (const map of maps) {
		const range = map.find(([input]) => inRange(value, input));

		if (!range) continue;

		const [[input], [output]] = range;

		value = output + value - input;
	}

	return value;
}

export function getLowestLocationNumberFromSeeds([seeds, maps]: Almanac) {
	let location = Infinity;

	for (const seed of seeds) {
		location = Math.min(location, pipe(seed, maps));
	}

	return location;
}

export function getLowestLocationNumberFromSeedRanges([seeds, maps]: Almanac) {
	const seedRanges = Array.from({ length: seeds.length / 2 }, (_, index) => {
		const [start, length] = seeds.slice(index * 2, index * 2 + 2);
		return [start, start + (length - 1)] as Range;
	});

	maps = maps
		.toReversed()
		.map((ranges) => ranges.map((range) => range.toReversed())) as MapRange[][];

	let location = 0;

	while (true) {
		const seed = pipe(location, maps);

		if (seedRanges.some((range) => inRange(seed, range))) break;

		location++;
	}

	return location;
}
