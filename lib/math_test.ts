import { describe, expect, test } from 'bun:test';
import {
	divide,
	divideAll,
	multiply,
	multiplyAll,
	subtract,
	subtractAll,
	sum,
	sumAll,
} from './math';

describe('Math library', () => {
	test('Sum 2 numbers', () => {
		expect(sum(1, 2)).toBe(3);
	});

	test('Sum an array of numbers', () => {
		expect(sumAll([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(45);
	});

	test('Subtract 2 numbers', () => {
		expect(subtract(4, 3)).toBe(1);
	});

	test('Subtract an array of numbers', () => {
		expect(subtractAll([9, 3, 4, 1])).toBe(1);
	});

	test('Multiply 2 numbers', () => {
		expect(multiply(2, 3)).toBe(6);
	});

	test('Multiply an array of numbers', () => {
		expect(multiplyAll([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(362880);
	});

	test('Divide 2 numbers', () => {
		expect(divide(4, 2)).toBe(2);
	});

	test('Divide an array of numbers', () => {
		expect(divideAll([6, 3, 2])).toBe(1);
	});
});
