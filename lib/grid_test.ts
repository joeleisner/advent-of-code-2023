import { describe, expect, test } from 'bun:test';
import { Line, Point, Points, isAdjacent, taxicab } from './grid';

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

	test('Taxicab geometry', () => {
		expect(taxicab([2, 8], [4, 4])).toBe(6);
		expect(taxicab([6, 2], [3, 7])).toBe(8);
	});

	test('Points', () => {
		expect(new Points()).toEqual(new Points());
		expect(
			new Points([
				[0, 1],
				[2, 3],
				[4, 5],
			])
		).toEqual(
			new Points([
				[0, 1],
				[2, 3],
				[4, 5],
			])
		);
		expect(
			new Points(
				new Points([
					[0, 1],
					[2, 3],
					[4, 5],
				])
			)
		).toEqual(
			new Points(
				new Points([
					[0, 1],
					[2, 3],
					[4, 5],
				])
			)
		);
		expect(
			new Points(
				new Set<Point>([
					[0, 1],
					[2, 3],
					[4, 5],
				])
			)
		).toEqual(
			new Points(
				new Set<Point>([
					[0, 1],
					[2, 3],
					[4, 5],
				])
			)
		);

		const points = new Points([
			[0, 1],
			[2, 3],
			[4, 5],
		]);

		expect(points.size).toBe(3);
		expect([...points]).toEqual([
			[0, 1],
			[2, 3],
			[4, 5],
		]);
		expect(points.add([6, 7]).add([8, 9])).toEqual(
			new Points([
				[0, 1],
				[2, 3],
				[4, 5],
				[6, 7],
				[8, 9],
			])
		);
		expect(points.clear()).toBeUndefined();
		points.add([0, 1]).add([2, 3]).add([4, 5]).add([6, 7]).add([8, 9]);
		expect(points.delete([8, 9])).toBeTrue();
		expect(points.delete([10, 11])).toBeFalse();
		expect([...points.entries()]).toEqual([
			[
				[0, 1],
				[0, 1],
			],
			[
				[2, 3],
				[2, 3],
			],
			[
				[4, 5],
				[4, 5],
			],
			[
				[6, 7],
				[6, 7],
			],
		]);
		expect(points.forEach((point) => point)).toBeUndefined();
		expect(points.has([6, 7])).toBeTrue();
		expect(points.has([8, 9])).toBeFalse();
		expect([...points.keys()]).toEqual([
			[0, 1],
			[2, 3],
			[4, 5],
			[6, 7],
		]);
		expect([...points.values()]).toEqual([
			[0, 1],
			[2, 3],
			[4, 5],
			[6, 7],
		]);
	});
});
