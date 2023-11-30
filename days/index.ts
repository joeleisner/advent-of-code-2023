import chalk from 'chalk';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function getDays(numbers?: Set<string>) {
	const days: string[] = [];

	const files = await readdir(new URL('./', import.meta.url), {
		withFileTypes: true,
	});

	for (const file of files) {
		if (file.isDirectory() && file.name !== 'create') days.push(file.name);
	}

	days.sort();

	if (!numbers) return days;

	const filtered = days.filter((day) => numbers.has(day));

	return filtered.length ? filtered : days;
}

const days = await getDays(
	new Set(
		Bun.argv
			.slice(2)
			.map((number) => (number.length === 1 ? `0${number}` : number))
	)
);

async function getDayTitle(directory: string) {
	const file = Bun.file(
		new URL(join('.', directory, 'readme.md'), import.meta.url)
	);

	const text = await file.text();

	const [day, title] = text.split('\n')[0].slice(2).split(': ');

	return [day, title] as [day: string, title: string];
}

async function runDay(directory: string) {
	const [day, title] = await getDayTitle(directory);

	console.log(chalk.green(day + ':'), chalk.cyan(title));

	await import(new URL(join('.', directory), import.meta.url).toString());
}

if (!days.length) console.log(chalk.red('No days found'));

for (const day of days) {
	await runDay(day);
}
