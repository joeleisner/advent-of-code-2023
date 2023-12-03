import { isAdjacent, Line, Point } from '../../lib/grid';
import { multiplyAll } from '../../lib/math';

type Parts = Map<number, Line[]>;

type Symbols = Map<string, Point[]>;

type Schematic = [parts: Parts, symbols: Symbols];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const parts: Parts = new Map();

	const symbols: Symbols = new Map();

	for (const [y, line] of text.split('\n').entries()) {
		for (const match of line.matchAll(/\d+/g)) {
			const number = String(match);
			const x = match.index!;
			parts.set(+number, [
				...(parts.get(+number) || []),
				[
					[x, y],
					[x + (number.length - 1), y],
				],
			]);
		}

		for (const match of line.matchAll(/[^\.\d]/g)) {
			if (match.index === undefined) continue;
			const symbol = String(match);
			symbols.set(symbol, [...(symbols.get(symbol) || []), [match.index, y]]);
		}
	}

	return [parts, symbols] as Schematic;
}

export function getSumOfPartNumbers([parts, symbols]: Schematic) {
	let sum = 0;

	const symbolPoints = [...symbols.values()].flat();

	for (const [number, instances] of parts.entries()) {
		for (const line of instances) {
			const isPartNumber = symbolPoints.some((point) =>
				isAdjacent(point, line)
			);

			if (!isPartNumber) continue;

			sum += number;
		}
	}

	return sum;
}

export function getSumOfGearRatios([parts, symbols]: Schematic) {
	let sum = 0;

	const gears = symbols.get('*')!;

	const partEntries = [...parts.entries()];

	for (const gear of gears) {
		const adjacentParts: number[] = [];

		for (const [number, instances] of partEntries) {
			for (const line of instances) {
				if (isAdjacent(gear, line)) adjacentParts.push(number);
			}
		}

		if (adjacentParts.length !== 2) continue;

		sum += multiplyAll(adjacentParts);
	}

	return sum;
}
