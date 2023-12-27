import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const relativePathToDays = '../days';

export function createDaysPath(...pathParts: string[]) {
	return new URL(join(relativePathToDays, ...pathParts), import.meta.url);
}

export async function getDays(include?: Set<string>, exclude?: Set<string>) {
	const days: string[] = [];

	const files = await readdir(createDaysPath(), {
		withFileTypes: true,
	});

	for (const file of files) {
		if (file.isDirectory()) days.push(file.name);
	}

	days.sort();

	if (!include?.size && !exclude?.size) return days;

	return days.filter(
		(day) => (include?.size ? include?.has(day) : true) && !exclude?.has(day)
	);
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
	const args = Bun.argv.slice(2);

	const include = new Set(
		args.filter((arg) => !arg.includes('!')).map(padNumber)
	);

	const exclude = new Set(
		args
			.filter((arg) => arg.includes('!'))
			.map((arg) => padNumber(arg.replace('!', '')))
	);

	return await getDays(include, exclude);
}
