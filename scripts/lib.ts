import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const relativePathToDays = '../days';

export function createDaysPath(...pathParts: string[]) {
	return new URL(join(relativePathToDays, ...pathParts), import.meta.url);
}

export async function getDays(numbers?: Set<string>) {
	const days: string[] = [];

	const files = await readdir(createDaysPath(), {
		withFileTypes: true,
	});

	for (const file of files) {
		if (file.isDirectory()) days.push(file.name);
	}

	days.sort();

	if (!numbers?.size) return days;

	return days.filter((day) => numbers.has(day));
}

export function padNumber(number: string) {
	return number.length === 1 ? '0' + number : number;
}

export function unpadNumber(number: string) {
	return number.length === 2 && number.charAt(0) === '0'
		? number.slice(1)
		: number;
}

export async function getDaysFromArgs() {
	return await getDays(new Set(Bun.argv.slice(2).map(padNumber)));
}
