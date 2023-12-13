import { describe, expect, test } from 'bun:test';
import {
	findMirror,
	getInput,
	getSummarizedNotes,
	getSummarizedNotesWithSmudges,
} from './mod';

describe('Day 13: Point of Incidence', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual([
			[
				'#.##..##.',
				'..#.##.#.',
				'##......#',
				'##......#',
				'..#.##.#.',
				'..##..##.',
				'#.#.##.#.',
			],
			[
				'#...##..#',
				'#....#..#',
				'..##..###',
				'#####.##.',
				'#####.##.',
				'..##..###',
				'#....#..#',
			],
		]);
	});

	const patterns = await getInput('./input_test.txt');

	test('Get summarized notes', () => {
		expect(getSummarizedNotes(patterns)).toBe(405);
	});

	test('Get summarized notes with smudges', () => {
		expect(getSummarizedNotesWithSmudges(patterns)).toBe(400);
	});
});
