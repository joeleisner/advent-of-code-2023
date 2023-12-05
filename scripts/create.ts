import { input } from '@inquirer/prompts';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { createDaysPath, padNumber, unpadNumber } from './lib';

const numberAnswer = await input({
	message: 'Day number:',
	validate(input) {
		if (!input || isNaN(+input)) return 'Specify a number';
		if (Bun.file(createDaysPath(padNumber(input))).size)
			return 'Day already exists';
		return true;
	},
});

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
	name: string;
	tokens?: boolean;
};

const files: File[] = [
	{
		name: 'bench.ts',
		tokens: true,
	},
	{
		name: 'index.ts',
	},
	{
		name: 'input_test.txt',
	},
	{
		name: 'input.txt',
	},
	{
		name: 'mod_test.ts',
		tokens: true,
	},
	{
		name: 'mod.ts',
	},
	{
		name: 'readme.md',
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
	return new URL(join('./create', fileName), import.meta.url);
}

function destPath(fileName = '') {
	return createDaysPath(paddedNumber, fileName);
}

async function createDay() {
	// Create the day directory
	await mkdir(destPath());

	for (const { name, tokens } of files) {
		const file = Bun.file(srcPath(name));

		if (!tokens) {
			await Bun.write(destPath(name), file);
			continue;
		}

		const text = await file.text();

		await Bun.write(destPath(name), replaceTokens(text));
	}
}

await createDay();
