export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text;
}

export function partOne(input: Awaited<ReturnType<typeof getInput>>) {
	return input;
}

export function partTwo(input: Awaited<ReturnType<typeof getInput>>) {
	return input;
}
