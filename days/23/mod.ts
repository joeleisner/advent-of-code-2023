import { equals } from '../../lib/array';
import { Point, Points } from '../../lib/grid';
import { TupleSet } from '../../lib/tuple';

export const slopes = ['^', '>', 'v', '<'] as const;

export type Slope = (typeof slopes)[number];

export type Tile = '.' | '#' | Slope;

export type Grid = Tile[][];

export type Input = [grid: Grid, start: Point, end: Point];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const grid = text.split('\n').map((line) => line.split('')) as Grid;

	const start: Point = [0, grid[0].findIndex((tile) => tile === '.')];

	const end: Point = [
		grid.length - 1,
		grid[grid.length - 1].findIndex((tile) => tile === '.'),
	];

	return [grid, start, end] as Input;
}

export const deltas: Point[] = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

export function getPoints([grid, start, end]: Input) {
	const points = new Points([start, end]);

	for (const [r, row] of grid.entries()) {
		for (const [c, tile] of row.entries()) {
			if (tile === '#') continue;

			let neighbors = 0;

			for (const [nr, nc] of deltas.map(([rd, cd]) => [r + rd, c + cd])) {
				if (nr < 0 || nr >= grid.length || nc < 0 || nr >= grid[0].length)
					continue;

				const newTile = grid.at(nr)?.at(nc);

				if (!newTile || newTile === '#') continue;

				neighbors += 1;
			}

			if (neighbors >= 3) points.add([r, c]);
		}
	}

	return points;
}

export type StackPoint = [steps: number, row: number, col: number];

export const directions: Record<Slope | '.', Point[]> = {
	'^': [[-1, 0]],
	v: [[1, 0]],
	'<': [[0, -1]],
	'>': [[0, 1]],
	'.': [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	],
};

export function getGraph([grid, start, end]: Input, withSlopes: boolean) {
	const points = getPoints([grid, start, end]);

	const graph = Object.fromEntries(
		[...points].map((point) => [
			JSON.stringify(point),
			{} as Record<string, number>,
		])
	);

	for (const [sr, sc] of points) {
		const stack: StackPoint[] = [[0, sr, sc]];
		const seen = new TupleSet<Point>([[sr, sc]]);

		while (stack.length) {
			const [n, r, c] = stack.shift()!;

			if (n && points.has([r, c])) {
				graph[JSON.stringify([sr, sc])][JSON.stringify([r, c])] = n;
				continue;
			}

			const tile = grid[r][c];

			if (tile === '#') continue;

			for (const [dr, dc] of withSlopes ? directions[tile] : deltas) {
				const nr = r + dr;
				const nc = c + dc;

				if (nr < 0 || nr >= grid.length || nc < 0 || nr >= grid[0].length)
					continue;

				const newTile = grid.at(nr)?.at(nc);

				if (!newTile || newTile === '#') continue;

				if (seen.has([nr, nc])) continue;

				stack.push([n + 1, nr, nc]);
				seen.add([nr, nc]);
			}
		}
	}

	return graph;
}

export function getLongestPath(
	[grid, start, end]: Input,
	withSlopes: boolean
): number {
	const graph = getGraph([grid, start, end], withSlopes);

	const seen = new Points();

	const dfs = (point: Point): number => {
		if (equals(point, end)) return 0;

		let max = -Infinity;

		seen.add(point);

		const connections = graph[JSON.stringify(point)];

		for (const nx of Object.keys(connections)) {
			const nxPoint = JSON.parse(nx) as Point;
			if (!seen.has(nxPoint))
				max = Math.max(max, dfs(nxPoint) + connections[nx]);
		}

		seen.delete(point);

		return max;
	};

	return dfs(start);
}

export function getLongestPathWithSlopes(input: Input) {
	return getLongestPath(input, true);
}

export function getLongestPathWithoutSlopes(input: Input) {
	return getLongestPath(input, false);
}
