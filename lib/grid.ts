import { inspect } from 'sys';
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

export function taxicab([x1, y1]: Point, [x2, y2]: Point) {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export class Points<TPoint extends Point = Point> {
	#set: Set<string>;

	constructor(iterable?: TPoint[] | Points<TPoint> | Set<TPoint>) {
		if (!iterable) {
			this.#set = new Set<string>();
			return;
		}

		const strings = [...iterable].map((point) => JSON.stringify(point));
		this.#set = new Set<string>(strings);
	}

	get size() {
		return this.#set.size;
	}

	*[Symbol.iterator]() {
		for (const value of this.#set[Symbol.iterator]()) {
			yield JSON.parse(value) as TPoint;
		}
	}

	add(point: TPoint) {
		this.#set.add(JSON.stringify(point));
		return this;
	}

	clear() {
		this.#set.clear();
	}

	delete(point: TPoint) {
		return this.#set.delete(JSON.stringify(point));
	}

	*entries(): IterableIterator<[TPoint, TPoint]> {
		for (const [value1, value2] of this.#set.entries()) {
			yield [JSON.parse(value1), JSON.parse(value2)] as [
				point: TPoint,
				point: TPoint,
			];
		}
	}

	forEach(
		callbackfn: (point: TPoint, point2: TPoint, points: Points<TPoint>) => void,
		thisArg?: any
	) {
		this.#set.forEach((value) => {
			const point = JSON.parse(value) as TPoint;
			callbackfn.call(thisArg, point, point, this);
		});
	}

	has(point: TPoint) {
		return this.#set.has(JSON.stringify(point));
	}

	*keys(): IterableIterator<TPoint> {
		for (const key of this.#set.keys()) {
			yield JSON.parse(key) as TPoint;
		}
	}

	*values(): IterableIterator<TPoint> {
		for (const value of this.#set.values()) {
			yield JSON.parse(value) as TPoint;
		}
	}
}
