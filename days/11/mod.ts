import { taxicab } from '../../lib/grid';

export type Grid = ('.' | '#')[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((row) => row.split('')) as Grid;
}

export type Galaxies = Set<string>;

export function getGalaxies(grid: Grid, offset: number) {
	offset = offset - 1;

	let yOffset = 0;
	let xOffset = 0;

	const galaxies: Galaxies = new Set();

	for (const [y, row] of grid.entries()) {
		for (const [x, col] of row.entries()) {
			if (col === '#') {
				galaxies.add(JSON.stringify([x + xOffset, y + yOffset]));
				continue;
			}

			if (grid.map((row) => row[x]).every((space) => space === '.'))
				xOffset += offset;
		}

		xOffset = 0;

		if (row.every((space) => space === '.')) yOffset += offset;
	}

	return galaxies;
}

export function getSumOfShortestPaths(galaxies: Galaxies | string[]) {
	galaxies = [...galaxies];

	let sum = 0;

	for (const [index, start] of galaxies.entries()) {
		for (const end of galaxies.slice(index + 1)) {
			sum += taxicab(JSON.parse(start), JSON.parse(end));
		}
	}

	return sum;
}

export function getSumOfShortestPathsExpandedByTwo(grid: Grid) {
	const galaxies = getGalaxies(grid, 2);
	return getSumOfShortestPaths(galaxies);
}

export function getSumOfShortestPathsExpandedByOneMillion(grid: Grid) {
	const galaxies = getGalaxies(grid, 1_000_000);
	return getSumOfShortestPaths(galaxies);
}
