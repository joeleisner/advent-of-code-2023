import { describe, expect, test } from 'bun:test';
import { Line, Point, isAdjacent } from './grid';

/**
 * ###......
 * ...*.....
 * .........
 */
describe('Grid library', () => {
	test('Point is adjacent to line', () => {
		const point: Point = [3, 1];
		const line: Line = [
			[0, 0],
			[2, 0],
		];
		expect(isAdjacent(point, line)).toBe(true);
		expect(isAdjacent(point, line, 0)).toBe(false);
	});
});
