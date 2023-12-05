import { describe, expect, test } from 'bun:test';
import { getInput, partOne, partTwo } from './mod';

describe('Day {{number}}: {{title}}', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual('');
	});

	const input = await getInput('./input_test.txt');

	test('Part 1', () => {
		expect(partOne(input)).toBe('');
	});

	test('Part 2', () => {
		expect(partTwo(input)).toBe('');
	});
});
