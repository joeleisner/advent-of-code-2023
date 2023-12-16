import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getEnergizedTilesFromTopLeft,
	getEnergizedTilesFromEdges,
} from './mod';

describe('Day 16: The Floor Will Be Lava', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			['.', '|', '.', '.', '.', '\\', '.', '.', '.', '.'],
			['|', '.', '-', '.', '\\', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '|', '-', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '.', '|', '.'],
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '\\'],
			['.', '.', '.', '.', '/', '.', '\\', '\\', '.', '.'],
			['.', '-', '.', '-', '/', '.', '.', '|', '.', '.'],
			['.', '|', '.', '.', '.', '.', '-', '|', '.', '\\'],
			['.', '.', '/', '/', '.', '|', '.', '.', '.', '.'],
		]);
	});

	const grid = await getInput('./input_test.txt');

	test('Get energized tiles from top left', () => {
		expect(getEnergizedTilesFromTopLeft(grid)).toBe(46);
	});

	test('Get energized tiles from edges', () => {
		expect(getEnergizedTilesFromEdges(grid)).toBe(51);
	});
});
