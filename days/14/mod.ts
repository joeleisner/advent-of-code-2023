import { sum } from '../../lib/math';
import { rotateClockwise } from '../../lib/matrix';

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => line.split('') as ('O' | '#' | '.')[]);
}

export type Grid = Awaited<ReturnType<typeof getInput>>;

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
			(row, index, grid) =>
				row.filter((rock) => rock === 'O').length * (grid.length - index)
		)
		.reduce(sum);
}

export function getTotalLoadAfterSlide(grid: Grid) {
	return getTotalLoad(slide(grid));
}

export function cycle(grid: Grid) {
	const north = slide(grid);

	const west = slide(rotateClockwise(north));

	const south = slide(rotateClockwise(west));

	const east = slide(rotateClockwise(south));

	return rotateClockwise(east);
}

export function cycles(grid: Grid, times = 1) {
	const seen: Map<string, number> = new Map();

	while (true) {
		grid = cycle(grid);

		const key = JSON.stringify(grid);

		if (!seen.has(key)) {
			seen.set(key, 1);
			continue;
		}

		const state = seen.get(key)!;

		if (state === 2) break;

		seen.set(key, 2);
	}

	const states = [...seen]
		.filter(([, count]) => count === 2)
		.map(([key]) => JSON.parse(key) as Grid);

	const offset = seen.size - states.length;

	const index = (times - offset) % states.length;

	return states[index - 1] as Grid;
}

export function getTotalLoadAfterABillionCycles(grid: Grid) {
	return getTotalLoad(cycles(grid, 1_000_000_000));
}
