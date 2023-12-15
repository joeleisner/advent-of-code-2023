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
		value = value * 17;
		value = value % 256;
	}

	return value;
}

export function getSumOfHash(sequence: string[]) {
	return sequence.map(hash).reduce(sum);
}

export type Instruction = [box: number, label: string, focalLength?: number];

export function getInstructions(sequence: string[]) {
	return sequence.map((instruction) => {
		if (instruction.charAt(instruction.length - 1) === '-') {
			const label = instruction.slice(0, -1);
			const box = hash(label);
			return [box, label] as Instruction;
		}

		const [label, focalLength] = instruction.split('=');
		const box = hash(label);

		return [box, label, Number(focalLength)] as Instruction;
	});
}

export function getBoxes(instructions: Instruction[]) {
	const boxes = Array.from({ length: 256 }, () => new Map<string, number>());

	for (const [box, label, focalLength] of instructions) {
		if (!focalLength) {
			if (!boxes[box].has(label)) continue;

			boxes[box].delete(label);
			continue;
		}

		boxes[box].set(label, focalLength);
	}

	return boxes;
}

export function getFocusingPower(map: Map<string, number>, boxIndex: number) {
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
