import { sum } from '../../lib/math';
import { rotateClockwise } from '../../lib/matrix';

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n\n').map((pattern) => pattern.split('\n'));
}

export function findMirror(pattern: string[], withSmudges = false) {
	for (let index of pattern.keys()) {
		index++;

		let above = pattern.slice(0, index).reverse();
		let below = pattern.slice(index);

		above = above.slice(0, below.length);
		below = below.slice(0, above.length);

		if (!above.length && !below.length) break;

		if (!withSmudges && above.every((line, index) => line === below[index])) {
			return index;
		}

		const smudge = above
			.map((aboveLine, row) =>
				[...aboveLine]
					.map((aboveChar, col) => {
						const belowChar = below[row][col];

						return Number(aboveChar !== belowChar);
					})
					.reduce(sum)
			)
			.reduce(sum);

		if (smudge === 1) return index;
	}

	return 0;
}

export function findMirrors(pattern: string[], withSmudges = false) {
	const cols = pattern[0]
		.split('')
		.map((_, index) => pattern.map((line) => line[index]).join(''));

	return findMirror(pattern, withSmudges) * 100 + findMirror(cols, withSmudges);
}

export function getSummarizedNotes(patterns: string[][]) {
	return patterns.map((pattern) => findMirrors(pattern, false)).reduce(sum);
}

export function getSummarizedNotesWithSmudges(patterns: string[][]) {
	return patterns.map((pattern) => findMirrors(pattern, true)).reduce(sum);
}
