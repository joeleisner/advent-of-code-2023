import { Point, Points, taxicab } from '../../lib/grid';

export type Grid = ('.' | '#')[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((row) => row.split('')) as Grid;
}

export function getGalaxies(grid: Grid, offset: number) {
	offset = offset - 1;

	let yOffset = 0;
	let xOffset = 0;

	const galaxies = new Points();

	for (const [y, row] of grid.entries()) {
		for (const [x, col] of row.entries()) {
			if (col === '#') {
				galaxies.add([x + xOffset, y + yOffset]);
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

export function getSumOfShortestPaths(galaxies: Points | Point[]) {
	galaxies = [...galaxies];

	let sum = 0;

	for (const [index, start] of galaxies.entries()) {
		for (const end of galaxies.slice(index + 1)) {
			sum += taxicab(start, end);
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
