import chalk from 'chalk';
import { run } from 'mitata';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function getDays(numbers?: Set<string>) {
	const days: string[] = [];

	const files = await readdir(new URL('../days', import.meta.url), {
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

async function runBenchmark(directory: string) {
	await import(
		new URL(join('../days', directory, 'bench.ts'), import.meta.url).toString()
	);
}

if (!days.length) console.log(chalk.red('No days found'));

for (const day of days) {
	await runBenchmark(day);
}

await run();
