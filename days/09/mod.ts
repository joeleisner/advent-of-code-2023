import { sumAll } from '../../lib/math';

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => line.split(' ').map(Number));
}

export function predictNextValue(values: number[]): number {
	if (values.every((value) => !value)) return 0;

	const deltas: number[] = [];

	for (const [index, value] of values.entries()) {
		if (values.at(index + 1) == undefined) break;
		deltas.push(values.at(index + 1)! - value);
	}

	return values.at(-1)! + predictNextValue(deltas);
}

export function getSumOfPredictedNextValues(
	histories: Awaited<ReturnType<typeof getInput>>
) {
	return sumAll(histories.map(predictNextValue));
}

export function getSumOfPredictedPreviousValues(
	histories: Awaited<ReturnType<typeof getInput>>
) {
	return sumAll(
		histories.map((history) => predictNextValue(history.toReversed()))
	);
}
