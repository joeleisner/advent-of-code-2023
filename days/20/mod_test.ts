import { describe, expect, test } from 'bun:test';
import {
	getInput,
	getMultipliedPulses,
	getFewestNumberOfButtonPresses,
} from './mod';

describe('Day 20: Pulse Propagation', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.1.txt')).toEqual(
			new Map([
				['broadcaster', { type: 'broadcaster', destinations: ['a', 'b', 'c'] }],
				['a', { type: '%', destinations: ['b'] }],
				['b', { type: '%', destinations: ['c'] }],
				['c', { type: '%', destinations: ['inv'] }],
				['inv', { type: '&', destinations: ['a'] }],
			])
		);
		expect(await getInput('./input_test.2.txt')).toEqual(
			new Map([
				['broadcaster', { type: 'broadcaster', destinations: ['a'] }],
				['a', { type: '%', destinations: ['inv', 'con'] }],
				['inv', { type: '&', destinations: ['b'] }],
				['b', { type: '%', destinations: ['con'] }],
				['con', { type: '&', destinations: ['output'] }],
			])
		);
	});

	const firstExample = await getInput('./input_test.1.txt');
	const secondExample = await getInput('./input_test.2.txt');

	test('Get multiplied pulses', () => {
		expect(getMultipliedPulses(firstExample)).toBe(32_000_000);
		expect(getMultipliedPulses(secondExample)).toBe(11_687_500);
	});

	const modules = await getInput('./input.txt');

	test('Get fewest number of button presses', () => {
		expect(getFewestNumberOfButtonPresses(modules)).toBe(243_037_165_713_371);
	});
});
