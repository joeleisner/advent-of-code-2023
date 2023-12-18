import { Point } from '../../lib/grid';

export type DirectionChar = 'R' | 'D' | 'L' | 'U';

export type Move = [direction: DirectionChar, amount: number];

export type Instruction = [partOne: Move, partTwo: Move];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const [direction, amount, color] = line.split(' ');

		return [
			[direction, Number(amount)],
			['RDLU'.at(Number(color.at(-2))), parseInt(color.slice(2, -2), 16)],
		] as Instruction;
	});
}

export const deltas: Record<DirectionChar, Point> = {
	R: [1, 0],
	D: [0, 1],
	L: [-1, 0],
	U: [0, -1],
};

export function dig(instructions: Instruction[], part: number) {
	const moves = instructions.map((instruction) => instruction[part - 1]);

	let perimeter = 0;

	const points: Point[] = [[0, 0]];

	for (const [direction, amount] of moves) {
		const [prevX, prevY] = points.at(-1)!;
		const [deltaX, deltaY] = deltas[direction];

		perimeter += amount;
		points.push([prevX + deltaX * amount, prevY + deltaY * amount]);
	}

	let area = 0;

	for (const index of points.keys()) {
		area +=
			((points[index][1] + points[(index + 1) % points.length][1]) *
				(points[index][0] - points[(index + 1) % points.length][0])) /
			2;
	}

	return area + perimeter / 2 + 1;
}

export function getFirstAreaOfLagoon(instructions: Instruction[]) {
	return dig(instructions, 1);
}

export function getSecondAreaOfLagoon(instructions: Instruction[]) {
	return dig(instructions, 2);
}
