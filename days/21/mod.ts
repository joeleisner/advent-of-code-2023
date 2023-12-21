import { assert } from '../../lib/assert';
import { Point, Points } from '../../lib/grid';
import { sum } from '../../lib/math';

export type Tile = 'S' | '.' | '#'; // Start, garden plot, rock

export type Grid = Tile[][];

export type Instructions = [start: Point, grid: Grid];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	let start: Point = [0, 0];

	const grid = text.split('\n').map((line, r) => {
		const tiles = line.split('') as Tile[];

		const c = tiles.indexOf('S');

		if (c > -1) {
			start = [r, c];
			tiles[c] = '.';
		}

		return tiles;
	}) as Grid;

	return [start, grid] as Instructions;
}

export function neighbors([r, c]: Point, grid: Grid) {
	return [
		[r - 1, c], // North
		[r + 1, c], // South
		[r, c - 1], // West
		[r, c + 1], // East
	].filter(
		([r, c]) =>
			r >= 0 &&
			c >= 0 &&
			r < grid.length &&
			c < grid[0].length &&
			grid[r][c] === '.'
	) as Point[];
}

type QueuedPoint = [point: Point, steps: number];

export function fillGrid([start, grid]: Instructions, steps: number) {
	const answers = new Points();
	const seen = new Points();
	const queue: QueuedPoint[] = [[start, steps]];

	while (queue.length) {
		const [point, steps] = queue.shift()!;

		if (steps % 2 === 0) answers.add(point);

		if (!steps) continue;

		for (const [r, c] of neighbors(point, grid)) {
			if (seen.has([r, c])) continue;

			seen.add([r, c]);
			queue.push([[r, c], steps - 1]);
		}
	}

	return answers.size;
}

export function getAmountOfGardenPlotsAfter64Steps(instructions: Instructions) {
	return fillGrid(instructions, 64);
}

export function getAmountOfGardenPlotsAfter26501365Steps([
	[sr, sc],
	grid,
]: Instructions) {
	assert(grid.length === grid[0].length, 'Grid is not a square');

	const gridSize = grid.length;
	const halfGridSize = ~~(gridSize / 2);

	assert(
		sr === sc && sr === halfGridSize && sc === halfGridSize,
		'Start is not at the center of the grid'
	);

	const steps = 26_501_365;

	assert(
		steps % gridSize === halfGridSize,
		'Steps is not a multiple of the grid size'
	);

	const gridWidth = Math.floor(steps / gridSize) - 1;

	const odd = (Math.floor(gridWidth / 2) * 2 + 1) ** 2;
	const odds = fillGrid([[sr, sc], grid], gridSize * 2 + 1) * odd;

	const even = (Math.floor((gridWidth + 1) / 2) * 2) ** 2;
	const evens = fillGrid([[sr, sc], grid], gridSize * 2) * even;

	const corners = [
		fillGrid([[gridSize - 1, sc], grid], gridSize - 1), // Top
		fillGrid([[sr, 0], grid], gridSize - 1), // Right
		fillGrid([[0, sc], grid], gridSize - 1), // Bottom
		fillGrid([[sr, gridSize - 1], grid], gridSize - 1), // Left
	].reduce(sum);

	const smalls =
		[
			fillGrid([[gridSize - 1, 0], grid], Math.floor(gridSize / 2) - 1), // Top-right
			fillGrid(
				[[gridSize - 1, gridSize - 1], grid],
				Math.floor(gridSize / 2) - 1
			), // Top-left
			fillGrid([[0, 0], grid], Math.floor(gridSize / 2) - 1), // Bottom-right
			fillGrid([[0, gridSize - 1], grid], Math.floor(gridSize / 2) - 1), // Bottom-left
		].reduce(sum) *
		(gridWidth + 1);

	const larges =
		[
			fillGrid([[gridSize - 1, 0], grid], Math.floor((gridSize * 3) / 2) - 1), // Top-right
			fillGrid(
				[[gridSize - 1, gridSize - 1], grid],
				Math.floor((gridSize * 3) / 2) - 1
			), // Top-left
			fillGrid([[0, 0], grid], Math.floor((gridSize * 3) / 2) - 1), // Bottom-right
			fillGrid([[0, gridSize - 1], grid], Math.floor((gridSize * 3) / 2) - 1), // Bottom-left
		].reduce(sum) * gridWidth;

	return odds + evens + corners + smalls + larges;
}
