import { input } from '@inquirer/prompts';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

function padNumber(number: string) {
	return number.length === 1 ? '0' + number : number;
}

const numberAnswer = await input({
	message: 'Day number:',
	validate(input) {
		if (!input || isNaN(+input)) return 'Specify a number';
		if (
			Bun.file(new URL(join('../days', padNumber(input)), import.meta.url)).size
		)
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
	name: string;
	tokens?: boolean;
};

const files: File[] = [
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

function destPath(fileName: string) {
	return new URL(join('../days', paddedNumber, fileName), import.meta.url);
}

async function createDay() {
	// Create the day directory
	await mkdir(destPath(''));

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
