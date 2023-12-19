import { Range, multiply, sum } from '../../lib/math';

export type Rating = 'x' | 'm' | 'a' | 's';

export type Operator = '<' | '>';

export type Rule = [
	rating: Rating,
	operator: Operator,
	value: number,
	workflow: string,
];

export type Workflows = {
	[name: string]: [rules: Rule[], fallback: string];
};

export function parseWorkflows(workflows: string) {
	return Object.fromEntries(
		workflows.split('\n').map((line) => {
			const [name, rawConditions] = line.slice(0, -1).split('{');

			const conditions: Rule[] = [];

			let fallback = '';

			for (const rawCondition of rawConditions.split(',')) {
				if (!rawCondition.includes(':')) {
					fallback = rawCondition;
					continue;
				}

				const [condition, workflow] = rawCondition.split(':');

				const operator = condition.includes('<') ? '<' : '>';

				const [rating, value] = condition.split(operator);

				conditions.push([rating as Rating, operator, Number(value), workflow]);
			}

			return [name, [conditions, fallback]];
		})
	) as Workflows;
}

export type Part = {
	[rating in Rating]: number;
};

export type Parts = Set<Part>;

export function parseParts(parts: string) {
	return parts.split('\n').map((rawPart) => {
		const part: Record<string, number | string[]> = {};

		for (const rating of rawPart.slice(1, -1).split(',')) {
			const [label, value] = rating.split('=');

			part[label] = Number(value);
		}

		return part as Part;
	});
}

export type System = [workflows: Workflows, parts: Part[]];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const [workflows, parts] = text.split('\n\n');

	return [parseWorkflows(workflows), parseParts(parts)] as System;
}

export type Operators = {
	[operator in Operator]: (rating: number, value: number) => boolean;
};

const operators: Operators = {
	'<': (rating: number, value: number) => rating < value,
	'>': (rating: number, value: number) => rating > value,
};

export function accept(
	part: Part,
	workflows: Workflows,
	workflow = 'in'
): boolean {
	if (workflow === 'R') return false;
	if (workflow === 'A') return true;

	const [rules, fallback] = workflows[workflow];

	for (const [label, operator, value, workflow] of rules) {
		const rating = part[label];

		if (!operators[operator](rating, value)) continue;

		return accept(part, workflows, workflow);
	}

	return accept(part, workflows, fallback);
}

export function getSumOfAcceptedPartsRatings([workflows, parts]: System) {
	return parts
		.filter((part) => accept(part, workflows))
		.map((part) => Object.values(part).reduce(sum))
		.reduce(sum);
}

export type Batch = {
	[rating in Rating]: Range;
};

export function batchSize(batch: Batch) {
	return Object.values(batch)
		.map(([min, max]) => max - min + 1)
		.reduce(multiply);
}

export function countAccepted(
	batch: Batch,
	workflows: Workflows,
	workflow = 'in'
) {
	if (workflow === 'R') return 0;
	if (workflow === 'A') return batchSize(batch);

	const [rules, fallback] = workflows[workflow];

	let total = 0;

	let broken = false;

	for (const [label, operator, value, workflow] of rules) {
		const [lo, hi] = batch[label];

		let T = [];
		let F = [];

		if (operator === '<') {
			T = [lo, value - 1];
			F = [value, hi];
		} else {
			T = [value + 1, hi];
			F = [lo, value];
		}

		if (T[0] <= T[1]) {
			total += countAccepted({ ...batch, [label]: T }, workflows, workflow);
		}

		if (F[0] <= F[1]) {
			batch = { ...batch, [label]: F };
		} else {
			broken = true;
			break;
		}
	}

	if (!broken) total += countAccepted(batch, workflows, fallback);

	return total;
}

export function getAmountOfDistinctRatingsCombinations([workflows]: System) {
	const batch: Batch = {
		x: [1, 4000],
		m: [1, 4000],
		a: [1, 4000],
		s: [1, 4000],
	};

	return countAccepted(batch, workflows);
}
