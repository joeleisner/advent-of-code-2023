import { multiplyAll } from '../../lib/math';

type CubeSet = {
	red: number;
	green: number;
	blue: number;
};

export function matchCubes(color: keyof CubeSet, string: string) {
	return +(string.match(`(\\d+) ${color}`)?.at(1) || 0);
}

type Games = Map<number, CubeSet[]>;

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return new Map(
		text.split('\n').map((line) => {
			const [game, cubes] = line.split(':');

			const id = +game.replace(/\D/g, '');

			const sets = cubes.split(';').map((set) => {
				const red = matchCubes('red', set);
				const green = matchCubes('green', set);
				const blue = matchCubes('blue', set);

				return {
					red,
					green,
					blue,
				} as CubeSet;
			});

			return [id, sets];
		})
	) as Games;
}

export function getPossibleGameIDs(
	{ red: maxRed, green: maxGreen, blue: maxBlue }: CubeSet,
	games: Games
) {
	const ids: number[] = [];

	for (const [id, sets] of games.entries()) {
		const possible = sets.every(
			({ red, green, blue }) =>
				red <= maxRed && green <= maxGreen && blue <= maxBlue
		);

		if (!possible) continue;

		ids.push(id);
	}

	return ids;
}

export function getMinimumCubeSetPowers(games: Games) {
	const powers: number[] = [];

	for (const sets of games.values()) {
		let minRed = 0;
		let minGreen = 0;
		let minBlue = 0;

		for (const { red, green, blue } of sets) {
			if (red > minRed) minRed = red;
			if (green > minGreen) minGreen = green;
			if (blue > minBlue) minBlue = blue;
		}

		powers.push(multiplyAll([minRed, minGreen, minBlue]));
	}

	return powers;
}
