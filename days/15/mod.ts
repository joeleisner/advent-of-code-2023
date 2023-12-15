import { sum } from '../../lib/math';

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split(',');
}

export function hash(string: string) {
	let value = 0;

	for (const char of string) {
		value += char.charCodeAt(0);
		value *= 17;
		value %= 256;
	}

	return value;
}

export function getSumOfHash(sequence: string[]) {
	return sequence.map(hash).reduce(sum);
}

export type Instruction = [box: number, label: string, focalLength?: number];

export function getInstructions(sequence: string[]) {
	return sequence.map((instruction) => {
		if (instruction.at(-1) === '-') {
			const label = instruction.slice(0, -1);
			const box = hash(label);
			return [box, label] as Instruction;
		}

		const [label, focalLength] = instruction.split('=');
		const box = hash(label);

		return [box, label, Number(focalLength)] as Instruction;
	});
}

export type LensSlots = Map<string, number>;

export function getBoxes(instructions: Instruction[]) {
	const boxes = Array.from({ length: 256 }, () => new Map() as LensSlots);

	for (const [box, label, focalLength] of instructions) {
		!focalLength
			? boxes[box].delete(label)
			: boxes[box].set(label, focalLength);
	}

	return boxes;
}

export function getFocusingPower(map: LensSlots, boxIndex: number) {
	if (!map.size) return 0;

	return [...map.values()]
		.map(
			(focalLength, slotIndex) => (boxIndex + 1) * (slotIndex + 1) * focalLength
		)
		.reduce(sum);
}

export function getSumOfFocusingPowers(sequence: string[]) {
	const instructions = getInstructions(sequence);

	const boxes = getBoxes(instructions);

	return boxes.map(getFocusingPower).reduce(sum);
}
