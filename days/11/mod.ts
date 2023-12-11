export type Grid = ('.' | '#')[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((row) => row.split('') as ('.' | '#')[]);
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

export type Point = [x: number, y: number];

export function getShortestPath(start: string, end: string) {
	const [x1, y1] = JSON.parse(start) as Point;
	const [x2, y2] = JSON.parse(end) as Point;

	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function getSumOfShortestPaths(galaxies: Galaxies | string[]) {
	galaxies = [...galaxies];

	let sum = 0;

	for (const [index, start] of galaxies.entries()) {
		for (const end of galaxies.slice(index + 1)) {
			sum += getShortestPath(start, end);
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
