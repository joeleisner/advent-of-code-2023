import { describe, expect, test } from 'bun:test';
import {
	getInput,
	steps,
	stepsToNavigateTheNetwork,
	stepsToSimultaneouslyNavigateTheNetwork,
} from './mod';

describe('Day 8: Haunted Wasteland', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.1.txt')).toEqual([
			[1, 0],
			new Map([
				['AAA', ['BBB', 'CCC']],
				['BBB', ['DDD', 'EEE']],
				['CCC', ['ZZZ', 'GGG']],
				['DDD', ['DDD', 'DDD']],
				['EEE', ['EEE', 'EEE']],
				['GGG', ['GGG', 'GGG']],
				['ZZZ', ['ZZZ', 'ZZZ']],
			]),
		]);
		expect(await getInput('./input_test.2.txt')).toEqual([
			[0, 0, 1],
			new Map([
				['AAA', ['BBB', 'BBB']],
				['BBB', ['AAA', 'ZZZ']],
				['ZZZ', ['ZZZ', 'ZZZ']],
			]),
		]);
	});

	const mapOne = await getInput('./input_test.1.txt');
	const mapTwo = await getInput('./input_test.2.txt');
	const mapThree = await getInput('./input_test.3.txt');

	test('Steps', () => {
		expect(steps(mapTwo, 'BBB', (node) => node === 'ZZZ')).toBe(3);
	});

	test('Steps to navigate the network', () => {
		expect(stepsToNavigateTheNetwork(mapOne)).toBe(2);
		expect(stepsToNavigateTheNetwork(mapTwo)).toBe(6);
	});

	test('Steps to simultaneously navigate the network', () => {
		expect(stepsToSimultaneouslyNavigateTheNetwork(mapThree)).toBe(6);
	});
});
