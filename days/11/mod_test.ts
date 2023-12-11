import { describe, expect, test } from 'bun:test';
import {
	getGalaxies,
	getInput,
	getShortestPath,
	getSumOfShortestPaths,
	getSumOfShortestPathsExpandedByTwo,
	getSumOfShortestPathsExpandedByOneMillion,
} from './mod';

describe('Day 11: Cosmic Expansion', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			['.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
			['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
			['.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
			['#', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
		]);
	});

	const grid = await getInput('./input_test.txt');

	test('Get galaxies', () => {
		expect(getGalaxies(grid, 2)).toEqual(
			new Set([
				'[4,0]',
				'[9,1]',
				'[0,2]',
				'[8,5]',
				'[1,6]',
				'[12,7]',
				'[9,10]',
				'[0,11]',
				'[5,11]',
			])
		);
	});

	test('Get shortest path', () => {
		expect(getShortestPath('[1,6]', '[5,11]')).toBe(9);
	});

	const galaxiesExpandedByTwo = getGalaxies(grid, 2);
	const galaxiesExpandedByTen = getGalaxies(grid, 10);
	const galaxiesExpandedByOneHundred = getGalaxies(grid, 100);

	test('Get sum of shortest paths', () => {
		expect(getSumOfShortestPaths(galaxiesExpandedByTwo)).toBe(374);
		expect(getSumOfShortestPaths(galaxiesExpandedByTen)).toBe(1030);
		expect(getSumOfShortestPaths(galaxiesExpandedByOneHundred)).toBe(8410);
	});

	test('Get sum of shortest paths expanded by two', () => {
		expect(getSumOfShortestPathsExpandedByTwo(grid)).toBe(374);
	});

	test('Get sum of shortest paths expanded by one million', () => {
		expect(getSumOfShortestPathsExpandedByOneMillion(grid)).toBe(82000210);
	});
});
