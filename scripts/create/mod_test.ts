import { describe, expect, test } from 'bun:test';
import { getInput } from './mod';

describe('Day {{number}}: {{title}}', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual('');
	});
});
