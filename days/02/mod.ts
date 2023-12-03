import { multiplyAll } from '../../lib/math';

const colors = ['red', 'green', 'blue'] as const;

type Colors = (typeof colors)[number];

type CubeSet = {
	[color in Colors]: number;
};

export function getCubeSet(string: string) {
	const set: Partial<CubeSet> = {};

	for (const color of colors) {
		set[color] = +(string.match(`(\\d+) ${color}`)?.at(1) || 0);
	}

	return set as CubeSet;
}

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const cubes = line.split(':')[1];

		return cubes.split(';').map((set) => getCubeSet(set));
	});
}

export function getPossibleGameIDs(
	{ red: maxRed, green: maxGreen, blue: maxBlue }: CubeSet,
	games: CubeSet[][]
) {
	const ids: number[] = [];

	for (const [index, sets] of games.entries()) {
		const possible = sets.every(
			({ red, green, blue }) =>
				red <= maxRed && green <= maxGreen && blue <= maxBlue
		);

		if (!possible) continue;

		ids.push(index + 1);
	}

	return ids;
}

export function getMinimumCubeSetPowers(games: CubeSet[][]) {
	const powers: number[] = [];

	for (const sets of games) {
		const minSet: CubeSet = {
			red: 0,
			green: 0,
			blue: 0,
		};

		for (const { red, green, blue } of sets) {
			if (red > minSet.red) minSet.red = red;
			if (green > minSet.green) minSet.green = green;
			if (blue > minSet.blue) minSet.blue = blue;
		}

		powers.push(multiplyAll(Object.values(minSet)));
	}

	return powers;
}
