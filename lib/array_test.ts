import { describe, expect, test } from 'bun:test';
import { equals, swap } from './array';

describe('Array library', () => {
	test('Equals', () => {
		expect(equals([0, 0], [0, 0])).toBeTrue();
		expect(equals([1, 2], [3, 4])).toBeFalse();
	});

	test('Swap', () => {
		const array = [1, 2, 3, 4];
		expect(
			(() => {
				swap(array, 0, -1);
				return array;
			})()
		).toEqual([4, 2, 3, 1]);
		expect(
			(() => {
				swap(array, 1, -2);
				return array;
			})()
		).toEqual([4, 3, 2, 1]);
	});
});
