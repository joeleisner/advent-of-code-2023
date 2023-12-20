import { lcm, multiply } from '../../lib/math';

export type Pulse = 0 | 1; // Low or high

export type ModuleType = 'broadcaster' | '%' | '&';

export type Module = {
	type: ModuleType;
	destinations: string[];
};

export type Modules = Map<string, Module>;

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return new Map(
		text.split('\n').map((line) => {
			const [module, rawDestinations] = line.split(' -> ');

			const name = module.includes('broadcaster')
				? 'broadcaster'
				: module.slice(1);

			const type = module.includes('broadcaster')
				? 'broadcaster'
				: (module[0] as ModuleType);

			const destinations = rawDestinations.split(/,\s*/);

			return [name, { type, destinations }];
		})
	) as Modules;
}

type FlipFlops = Map<string, boolean>;

export function setUpFlipFlops(modules: Modules) {
	const flipFlops: FlipFlops = new Map();

	for (const [name, { type }] of modules) {
		if (type !== '%') continue;

		flipFlops.set(name, false);
	}

	return flipFlops;
}

type Conjunctions = Map<string, Record<string, Pulse>>;

export function setUpConjunctions(modules: Modules) {
	const names = [...modules]
		.filter(([, { type }]) => type === '&')
		.map(([name]) => name);

	const conjunctions: Conjunctions = new Map();

	for (const name of names) conjunctions.set(name, {});

	for (const [name, { destinations }] of modules) {
		const cjs = destinations.filter((module) => names.includes(module));

		if (!cjs.length) continue;

		for (const cj of cjs) conjunctions.get(cj)![name] = 0;
	}

	return conjunctions;
}

type QueuedPulse = [from: string, pulse: Pulse, to: string];

type LowHighPulses = [low: number, high: number];

type CycleLengths = Record<string, number>;

export function run(modules: Modules, times: number): LowHighPulses;
export function run(
	modules: Modules,
	findCycleLengths: true,
	output: string
): CycleLengths;
export function run(
	modules: Modules,
	iterate: number | boolean,
	output?: string
) {
	let low = 0;
	let high = 0;

	const flipFlops = setUpFlipFlops(modules);
	const conjunctions = setUpConjunctions(modules);

	const findCycleLengths = iterate === true;

	const feed = findCycleLengths
		? [...modules].filter(([, { destinations }]) =>
				destinations.includes(output!)
		  )[0][0]
		: undefined;
	const cycleLengths: CycleLengths = {};
	const seen = findCycleLengths
		? structuredClone(conjunctions.get(feed!) as CycleLengths)
		: undefined;

	let presses = 0;

	iterations: while (iterate) {
		if (findCycleLengths) presses += 1;

		const queue: QueuedPulse[] = [['button', 0, 'broadcaster']];

		while (queue.length) {
			const [from, pulse, name] = queue.shift()!;

			if (!findCycleLengths) pulse ? (high += 1) : (low += 1);

			const module = modules.get(name);

			if (!module) continue;

			if (findCycleLengths && name === feed && pulse) {
				seen![from] += 1;

				if (!Object.keys(cycleLengths).includes(from)) {
					cycleLengths[from] = presses;
				} else {
					if (presses !== seen![from] * cycleLengths[from]) {
						throw new Error(
							'Number of presses does not match seen[from] * cycleLengths[from]'
						);
					}
				}

				if (Object.values(seen!).every((value) => value)) break iterations;
			}

			const { type, destinations } = module;

			// Broadcaster module
			if (type === 'broadcaster') {
				queue.push(
					...destinations.map((to) => [name, pulse, to] as QueuedPulse)
				);
				continue;
			}

			// Flip-flop module
			if (type === '%') {
				if (pulse) continue;

				flipFlops.set(name, !flipFlops.get(name));

				const newPulse = Number(flipFlops.get(name)) as Pulse;

				queue.push(
					...destinations.map((to) => [name, newPulse, to] as QueuedPulse)
				);

				continue;
			}

			// Conjunction module
			if (type === '&') {
				conjunctions.get(name)![from] = pulse;

				const newPulse = Number(
					!Object.values(conjunctions.get(name)!).every((pulse) => pulse)
				) as Pulse;

				queue.push(
					...destinations.map((to) => [name, newPulse, to] as QueuedPulse)
				);
			}
		}

		if (typeof iterate === 'number') iterate--;
	}

	return findCycleLengths ? cycleLengths! : ([low, high] as LowHighPulses);
}

export function getMultipliedPulses(modules: Modules) {
	return run(modules, 1000).reduce(multiply);
}

export function getFewestNumberOfButtonPresses(modules: Modules) {
	return lcm(...Object.values(run(modules, true, 'rx')));
}
