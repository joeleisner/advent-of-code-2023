export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text;
}
