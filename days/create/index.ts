import { input } from '@inquirer/prompts';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import chalk from 'chalk';

function padNumber(number: string) {
	return number.length === 1 ? '0' + number : number;
}

const numberAnswer = await input({
	message: 'Day number:',
	validate(input) {
		if (!input || isNaN(+input)) return 'Specify a number';
		if (Bun.file(new URL(join('..', padNumber(input)), import.meta.url)).size)
			return 'Day already exists';
		return true;
	},
});

function unpadNumber(number: string) {
	return number.length === 2 && number.charAt(0) === '0'
		? number.slice(1)
		: number;
}

const number = unpadNumber(numberAnswer);

const paddedNumber = padNumber(numberAnswer);

const title = await input({
	message: 'Day title:',
	validate(input) {
		if (!input) return 'Specify a title';
		return true;
	},
});

type File = {
	src: string;
	dest?: string;
	tokens?: boolean;
};

const files: File[] = [
	{
		src: 'day.ts',
		dest: 'index.ts',
	},
	{
		src: 'input_test.txt',
	},
	{
		src: 'input.txt',
	},
	{
		src: 'mod-test.ts',
		dest: 'mod_test.ts',
		tokens: true,
	},
	{
		src: 'mod.ts',
	},
	{
		src: 'readme.md',
		tokens: true,
	},
];

function replaceTokens(string: string) {
	return string
		.replaceAll('{{number}}', number)
		.replaceAll('{{title}}', title)
		.replaceAll('{{padded_number}}', paddedNumber);
}

function srcPath(fileName: string) {
	return new URL(join('.', fileName), import.meta.url);
}

function destPath(fileName: string) {
	return new URL(join('..', paddedNumber, fileName), import.meta.url);
}

async function createDay() {
	// Create the day directory
	await mkdir(destPath(''));

	for (const { src, dest, tokens } of files) {
		const file = Bun.file(srcPath(src));

		if (!tokens) {
			await Bun.write(destPath(dest || src), file);
			continue;
		}

		const text = await file.text();

		await Bun.write(destPath(dest || src), replaceTokens(text));
	}
}

await createDay();
