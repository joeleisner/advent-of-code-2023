import { Points, type Point } from '../../lib/grid';

export type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F';

export type Grid<TTile extends string> = TTile[][];

export type Tiles = [start: Point, grid: Grid<'.' | Pipe>];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const grid = text.split('\n').map((line) => line.split('')) as Grid<
		'S' | '.' | Pipe
	>;

	const start: Point = [0, 0];

	for (const [y, line] of grid.entries()) {
		const x = line.indexOf('S');

		if (x < 0) continue;

		start[0] = x;
		start[1] = y;

		break;
	}

	const [x, y] = start;

	const north = ['|', '7', 'F'].includes(grid.at(y - 1)?.at(x) || '');
	const south = ['|', 'L', 'J'].includes(grid.at(y + 1)?.at(x) || '');
	const east = ['-', 'J', '7'].includes(grid.at(y)?.at(x + 1) || '');
	const west = ['-', 'L', 'F'].includes(grid.at(y)?.at(x - 1) || '');

	// North to east
	if (north && east) grid[y][x] = 'L';

	// South to east
	if (south && east) grid[y][x] = 'F';

	// South to west
	if (south && west) grid[y][x] = '7';

	// North to west
	if (north && west) grid[y][x] = 'J';

	// East to west
	if (east && west) grid[y][x] = '-';

	// North to south
	if (north && south) grid[y][x] = '|';

	return [start, grid as Grid<'.' | Pipe>] as Tiles;
}

export function getLoop([[x, y], grid]: Tiles) {
	const loop = new Points();

	while (true) {
		const tile = grid[y][x];

		if (tile === '.') break;

		loop.add([x, y]);

		const goNorth = ['|', 'L', 'J'].includes(tile) && !loop.has([x, y - 1]);

		const goSouth = ['|', '7', 'F'].includes(tile) && !loop.has([x, y + 1]);

		const goEast = ['-', 'L', 'F'].includes(tile) && !loop.has([x + 1, y]);

		const goWest = ['-', '7', 'J'].includes(tile) && !loop.has([x - 1, y]);

		if (goNorth) {
			y--;
			continue;
		}

		if (goSouth) {
			y++;
			continue;
		}

		if (goEast) {
			x++;
			continue;
		}

		if (goWest) {
			x--;
			continue;
		}

		break;
	}

	return loop;
}

export function getStepsToFurthestPointOnLoop(tiles: Tiles) {
	return getLoop(tiles).size / 2;
}

export function getAmountOfEnclosedTiles([start, grid]: Tiles) {
	const loop = getLoop([start, grid]);

	// Convert non-loop tiles to ground
	for (const [y, row] of grid.entries()) {
		for (const x of row.keys()) {
			if (loop.has([x, y])) continue;
			grid[y][x] = '.';
		}
	}

	const outside = new Points();

	// Horizontal search
	for (const [y, row] of grid.entries()) {
		let within = false;
		let up = false;

		for (const [x, tile] of row.entries()) {
			if (tile === '|') {
				within = !within;
			} else if (['L', 'F'].includes(tile)) {
				up = tile === 'L';
			} else if (['7', 'J'].includes(tile)) {
				if (up ? tile !== 'J' : tile !== '7') within = !within;
				up = false;
			}

			if (!within) outside.add([x, y]);
		}
	}

	return grid.length * grid[0].length - new Points([...outside, ...loop]).size;
}
