import chalk from 'chalk';
import { createDaysPath, getDaysFromArgs } from './lib';

const days = await getDaysFromArgs();

async function getDayTitle(directory: string) {
	const file = Bun.file(createDaysPath(directory, 'readme.md'));

	const text = await file.text();

	const [day, title] = text.split('\n')[0].slice(2).split(': ');

	return [day, title] as [day: string, title: string];
}

async function runDay(directory: string) {
	const [day, title] = await getDayTitle(directory);

	console.log(chalk.green(day + ':'), chalk.cyan(title));

	await import(createDaysPath(directory).toString());
}

if (!days.length) console.log(chalk.red('No days found'));

for (const day of days) {
	await runDay(day);
}
