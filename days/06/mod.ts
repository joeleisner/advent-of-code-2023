import { multiplyAll, quadratic } from '../../lib/math';

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

export function getWins([time, distance]: Race) {
	const [r1, r2] = quadratic(1, time, distance + 1);

	const low = Math.ceil(Math.min(r1, r2));
	const high = Math.floor(Math.max(r1, r2));

	return high - low + 1;
}

export function getMultipliedWinsOfRaces(races: Race[]) {
	return multiplyAll(races.map(getWins));
}

export function getWinsOfRace(races: Race[]) {
	const race: Race = [0, 0];

	for (const [time, distance] of races) {
		race[0] = Number(String(race[0]) + String(time));
		race[1] = Number(String(race[1]) + String(distance));
	}

	return getWins(race);
}
