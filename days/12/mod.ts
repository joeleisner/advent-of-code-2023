import { sum } from '../../lib/math';

export type Condition = '.' | '#' | '?';

export type Record = [conditions: Condition[], groups: number[]];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const [rawConditions, rawGroups] = line.split(' ');

		const conditions = rawConditions.split('') as Condition[];

		const groups = rawGroups.split(',').map(Number);

		return [conditions, groups] as Record;
	});
}

export type Cache = Map<string, number>;

export const cache: Cache = new Map();

export function arrangements([conditions, groups]: Record): number {
	if (!conditions.length) return groups.length ? 0 : 1;

	if (!groups.length) return conditions.includes('#') ? 0 : 1;

	const key = JSON.stringify([conditions, groups]);

	if (cache.has(key)) return cache.get(key)!;

	let result = 0;

	const condition = conditions[0];

	if (condition === '.' || condition === '?') {
		result += arrangements([conditions.slice(1), groups]);
	}

	const group = groups[0];

	if (condition === '#' || condition === '?') {
		if (
			group <= conditions.length &&
			!conditions.slice(0, group).includes('.') &&
			(group === conditions.length || conditions[group] !== '#')
		) {
			result += arrangements([conditions.slice(group + 1), groups.slice(1)]);
		}
	}

	cache.set(key, result);

	return result;
}

export function getSumOfArrangements(records: Record[], clearCache = false) {
	if (clearCache) cache.clear();
	return records.map(arrangements).reduce(sum);
}

export function unfold([conditions, groups]: Record) {
	conditions = Array(5)
		.fill([...conditions, '?'])
		.flat();

	// Removes trailing "?"
	conditions.pop();

	groups = Array(5).fill(groups).flat();

	return [conditions, groups] as Record;
}

export function getSumOfUnfoldedArrangements(
	records: Record[],
	clearCache = false
) {
	if (clearCache) cache.clear();
	return records.map(unfold).map(arrangements).reduce(sum);
}
