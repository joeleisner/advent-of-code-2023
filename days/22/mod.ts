export type Brick = [
	startX: number,
	startY: number,
	startZ: number,
	endX: number,
	endY: number,
	endZ: number,
];

export function sortBricks([, , z1, , , z2]: Brick, [, , z3, , , z4]: Brick) {
	return Math.min(z1, z2) - Math.min(z3, z4);
}

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text
		.split('\n')
		.map((brick) => brick.replace('~', ',').split(',').map(Number) as Brick)
		.sort(sortBricks);
}

export function overlaps(
	[sx1, sy1, , ex1, ey1]: Brick,
	[sx2, sy2, , ex2, ey2]: Brick
) {
	return (
		Math.max(sx1, sx2) <= Math.min(ex1, ex2) &&
		Math.max(sy1, sy2) <= Math.min(ey1, ey2)
	);
}

export function fall(bricks: Brick[]) {
	bricks = structuredClone(bricks);

	for (const [index, brick] of bricks.entries()) {
		let maxZ = 1;

		for (const check of bricks.slice(0, index)) {
			if (overlaps(check, brick)) {
				maxZ = Math.max(maxZ, check[5] + 1);
			}
		}

		brick[5] -= brick[2] - maxZ;
		brick[2] = maxZ;
	}

	bricks.sort(sortBricks);

	return bricks;
}

export function supports(bricks: Brick[]) {
	const kSupportsV = Object.fromEntries(
		Array.from({ length: bricks.length }, (_) => new Set<number>()).entries()
	);
	const vSupportsK = Object.fromEntries(
		Array.from({ length: bricks.length }, (_) => new Set<number>()).entries()
	);

	for (const [j, upper] of bricks.entries()) {
		for (const [i, lower] of bricks.slice(0, j).entries()) {
			if (overlaps(lower, upper) && upper[2] === lower[5] + 1) {
				kSupportsV[i].add(j);
				vSupportsK[j].add(i);
			}
		}
	}

	return [kSupportsV, vSupportsK] as const;
}

export function simulate(bricks: Brick[]) {
	return supports(fall(bricks));
}

export function getAmountOfBricksThatCanBeDisintegrated(bricks: Brick[]) {
	const [kSupportsV, vSupportsK] = simulate(bricks);

	let total = 0;

	for (const i of bricks.keys()) {
		if ([...kSupportsV[i]].every((j) => vSupportsK[j].size >= 2)) {
			total += 1;
		}
	}

	return total;
}

export function getAmountOfBricksThatWouldFall(bricks: Brick[]) {
	const [kSupportsV, vSupportsK] = simulate(bricks);

	let total = 0;

	for (const i of bricks.keys()) {
		const queue = [...kSupportsV[i]].filter((j) => vSupportsK[j].size === 1);
		const falling = new Set(queue);

		falling.add(i);

		while (queue.length) {
			const j = queue.shift()!;

			for (const k of kSupportsV[j]) {
				if (falling.has(k)) continue;

				if ([...vSupportsK[k]].every((l) => falling.has(l))) {
					queue.push(k);
					falling.add(k);
				}
			}
		}

		total += falling.size - 1;
	}

	return total;
}
