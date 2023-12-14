import { sum } from '../../lib/math';
import { rotateClockwise } from '../../lib/matrix';

export type Grid = ('O' | '#' | '.')[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => line.split('') as Grid[number]);
}

export function slide(grid: Grid) {
	grid = [...grid];

	for (const y of grid.keys()) {
		for (const x of grid[y].keys()) {
			const rock = grid[y][x];

			if (rock !== 'O') continue;

			let stop = y - 1;

			while (stop >= 0) {
				if (['#', 'O'].includes(grid[stop][x])) {
					grid[y][x] = '.';
					grid[stop + 1][x] = 'O';
					break;
				}

				if (!stop) {
					grid[y][x] = '.';
					grid[stop][x] = 'O';
					break;
				}

				stop--;
			}
		}
	}

	return grid;
}

export function getTotalLoad(grid: Grid) {
	return grid
		.map(
			(row, index) =>
				row.filter((rock) => rock === 'O').length * (grid.length - index)
		)
		.reduce(sum);
}

export function getTotalLoadAfterSlide(grid: Grid) {
	return getTotalLoad(slide(grid));
}

export function cycle(grid: Grid, index = 0) {
	if (index) grid = rotateClockwise(grid);

	if (index === 4) return grid;

	return cycle(slide(grid), index + 1);
}

export function cycles(grid: Grid, times = 1) {
	const seen: Set<string> = new Set();

	let iterations = 0;

	while (true) {
		iterations++;

		grid = cycle(grid);

		const value = JSON.stringify(grid);

		if (seen.has(value)) break;

		seen.add(value);
	}

	const states = [...seen];

	const offset = states.indexOf(JSON.stringify(grid)) + 1;

	const index = ((times - offset) % (iterations - offset)) + offset - 1;

	return JSON.parse(states[index]) as Grid;
}

export function getTotalLoadAfterABillionCycles(grid: Grid) {
	return getTotalLoad(cycles(grid, 1_000_000_000));
}
