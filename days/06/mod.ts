import { multiplyAll } from '../../lib/math';

type Race = [time: number, distance: number];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const [times, distances] = text
		.split('\n')
		.map((line) => [...line.matchAll(/\d+/g)].flat().map(Number));

	const races: Race[] = [];

	times.forEach((time, index) => races.push([time, distances[index]]));

	return races;
}

export function getMultipliedWaysToWinRaces(races: Race[]) {
	const waysToWin: number[] = [];

	for (const [time, distanceToBeat] of races) {
		const buttonHolds: Race[] = [];
		let buttonHold = time - 1;

		while (buttonHold) {
			const remainingTime = time - buttonHold;
			const distanceTraveled = remainingTime * buttonHold;

			if (distanceTraveled > distanceToBeat)
				buttonHolds.push([buttonHold, distanceTraveled]);

			buttonHold--;
		}

		waysToWin.push(buttonHolds.length);
	}

	return multiplyAll(waysToWin);
}

export function getMultipliedWaysToWinRace(races: Race[]) {
	const race: Race = [0, 0];

	for (const [time, distance] of races) {
		race[0] = Number(String(race[0]) + String(time));
		race[1] = Number(String(race[1]) + String(distance));
	}

	return getMultipliedWaysToWinRaces([race]);
}
