import { inRange } from './math';

export type Point = [x: number, y: number];

export type Line = [start: Point, end: Point];

export function isAdjacent(
	[x, y]: Point,
	[[x1, y1], [x2, y2]]: Line,
	offset = 1
) {
	return inRange(x, [x1, x2], offset) && inRange(y, [y1, y2], offset);
}
