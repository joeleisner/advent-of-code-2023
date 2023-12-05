import chalk from 'chalk';
import { run } from 'mitata';
import { createDaysPath, getDaysFromArgs } from './lib';

const days = await getDaysFromArgs();

async function runBenchmark(directory: string) {
	await import(createDaysPath(directory, 'bench.ts').toString());
}

if (!days.length) console.log(chalk.red('No days found'));

for (const day of days) {
	await runBenchmark(day);
}

if (days.length) await run();
