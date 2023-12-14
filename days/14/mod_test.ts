import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getTotalLoadAfterSlide,
	getTotalLoadAfterABillionCycles,
} from './mod';

describe('Day 14: Parabolic Reflector Dish', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			['O', '.', '.', '.', '.', '#', '.', '.', '.', '.'],
			['O', '.', 'O', 'O', '#', '.', '.', '.', '.', '#'],
			['.', '.', '.', '.', '.', '#', '#', '.', '.', '.'],
			['O', 'O', '.', '#', 'O', '.', '.', '.', '.', 'O'],
			['.', 'O', '.', '.', '.', '.', '.', 'O', '#', '.'],
			['O', '.', '#', '.', '.', 'O', '.', '#', '.', '#'],
			['.', '.', 'O', '.', '.', '#', 'O', '.', '.', 'O'],
			['.', '.', '.', '.', '.', '.', '.', 'O', '.', '.'],
			['#', '.', '.', '.', '.', '#', '#', '#', '.', '.'],
			['#', 'O', 'O', '.', '.', '#', '.', '.', '.', '.'],
		]);
	});

	const input = await getInput('./input_test.txt');

	test('Get total load after slide', () => {
		expect(getTotalLoadAfterSlide(input)).toBe(136);
	});

	test('Get total load after a billion cycles', () => {
		expect(getTotalLoadAfterABillionCycles(input)).toBe(64);
	});
});
