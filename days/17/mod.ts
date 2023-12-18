import { equals } from '../../lib/array';
import { PriorityQueue, PriorityQueueComparator } from '../../lib/structure';
import { ShiftTuple, TupleSet } from '../../lib/tuple';

export type Grid = number[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => line.split('').map(Number)) as Grid;
}

export type QueuedPath = [
	heatLoss: number,
	row: number,
	col: number,
	deltaRow: number,
	deltaCol: number,
	steps: number,
];

export const compareQueuedPaths: PriorityQueueComparator<QueuedPath> = (
	[heatLossA],
	[heatLossB]
) => heatLossB - heatLossA;

export type NavigatedPath = ShiftTuple<QueuedPath>;

export const deltas = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];

export function getMinimalHeatLoss(grid: Grid, withUltraCrucibles: boolean) {
	const queue = new PriorityQueue(compareQueuedPaths, [[0, 0, 0, 0, 0, 0]]);

	const seen = new TupleSet<NavigatedPath>();

	while (queue.size) {
		const [heatLoss, row, col, rowDelta, colDelta, steps] = queue.pop()!;

		if (
			row === grid.length - 1 &&
			col === grid[0].length - 1 &&
			(withUltraCrucibles ? steps >= 4 : true)
		)
			return heatLoss;

		const key = [row, col, rowDelta, colDelta, steps] as NavigatedPath;

		if (seen.has(key)) continue;

		seen.add(key);

		const queuePath = (rowDelta: number, colDelta: number, steps: number) => {
			const newRow = row + rowDelta;
			const newCol = col + colDelta;

			if (
				newRow < 0 ||
				newRow >= grid.length ||
				newCol < 0 ||
				newCol >= grid[0].length
			)
				return;

			queue.push([
				heatLoss + grid[newRow][newCol],
				newRow,
				newCol,
				rowDelta,
				colDelta,
				steps,
			]);
		};

		if (
			steps < (withUltraCrucibles ? 10 : 3) &&
			!equals([rowDelta, colDelta], [0, 0])
		)
			queuePath(rowDelta, colDelta, steps + 1);

		if (
			withUltraCrucibles
				? steps >= 4 || equals([rowDelta, colDelta], [0, 0])
				: true
		) {
			for (const [newRowDelta, newColDelta] of deltas) {
				if (
					equals([newRowDelta, newColDelta], [rowDelta, colDelta]) ||
					equals([newRowDelta, newColDelta], [-rowDelta, -colDelta])
				)
					continue;
				queuePath(newRowDelta, newColDelta, 1);
			}
		}
	}

	return 0;
}

export function getMinimalHeatLossWithRegularCrucibles(grid: Grid) {
	return getMinimalHeatLoss(grid, false);
}

export function getMinimalHeatLossWithUltraCrucibles(grid: Grid) {
	return getMinimalHeatLoss(grid, true);
}
