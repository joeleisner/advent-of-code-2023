import { Point } from '../../lib/grid';

export type Tile = '.' | '/' | '\\' | '|' | '-';

export type Grid = Tile[][];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => line.split('') as Tile[]) as Grid;
}

export type PosDelta = [position: Point, delta: Point];

export function getEnergizedTiles(grid: Grid, start: PosDelta) {
	const beams = new Map<string, PosDelta>([[crypto.randomUUID(), start]]);

	const energized = new Map<string, string[]>();

	while (beams.size) {
		for (const [id, [[bx, by], [dx, dy]]] of beams) {
			if (by < 0 || by > grid.length - 1 || bx < 0 || bx > grid[0].length - 1) {
				beams.delete(id);
				continue;
			}

			const key = JSON.stringify([bx, by]);
			const value = JSON.stringify([
				[bx, by],
				[dx, dy],
			]);

			if (energized.get(key)?.includes(value)) {
				beams.delete(id);
				continue;
			}

			if (energized.has(key)) {
				energized.get(key)?.push(value);
			} else {
				energized.set(key, [value]);
			}

			const tile = grid[by][bx];

			// Split vertically
			if (!dy && tile === '|') {
				beams.set(crypto.randomUUID(), [
					[bx, by - 1],
					[0, -1],
				]);
				beams.set(crypto.randomUUID(), [
					[bx, by + 1],
					[0, 1],
				]);
				beams.delete(id);
				continue;
			}

			// Split horizontally
			if (!dx && tile === '-') {
				beams.set(crypto.randomUUID(), [
					[bx - 1, by],
					[-1, 0],
				]);
				beams.set(crypto.randomUUID(), [
					[bx + 1, by],
					[1, 0],
				]);
				beams.delete(id);
				continue;
			}

			// Horizontal to up
			if ((dx === 1 && tile === '/') || (dx === -1 && tile === '\\')) {
				beams.set(id, [
					[bx, by - 1],
					[0, -1],
				]);
				continue;
			}

			// Horizontal to down
			if ((dx === 1 && tile === '\\') || (dx === -1 && tile === '/')) {
				beams.set(id, [
					[bx, by + 1],
					[0, 1],
				]);
				continue;
			}

			// Vertical to left
			if ((dy === 1 && tile === '/') || (dy === -1 && tile === '\\')) {
				beams.set(id, [
					[bx - 1, by],
					[-1, 0],
				]);
				continue;
			}

			// Vertical to right
			if ((dy === 1 && tile === '\\') || (dy === -1 && tile === '/')) {
				beams.set(id, [
					[bx + 1, by],
					[1, 0],
				]);
				continue;
			}

			// Continue in original direction
			beams.set(id, [
				[bx + dx, by + dy],
				[dx, dy],
			]);
		}
	}

	return energized.size;
}

export function getEnergizedTilesFromTopLeft(grid: Grid) {
	return getEnergizedTiles(grid, [
		[0, 0],
		[1, 0],
	]);
}

export function getEnergizedTilesFromEdges(grid: Grid) {
	let energizedTiles = 0;

	for (const y of grid.keys()) {
		energizedTiles = Math.max(
			energizedTiles,
			getEnergizedTiles(grid, [
				[0, y],
				[1, 0],
			]),
			getEnergizedTiles(grid, [
				[grid[0].length - 1, y],
				[-1, 0],
			])
		);
	}

	for (const x of grid[0].keys()) {
		energizedTiles = Math.max(
			energizedTiles,
			getEnergizedTiles(grid, [
				[x, 0],
				[0, 1],
			]),
			getEnergizedTiles(grid, [
				[x, grid.length - 1],
				[0, -1],
			])
		);
	}

	return energizedTiles;
}
