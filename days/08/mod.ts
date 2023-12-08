import { lcm } from '../../lib/math';

type Direction = 0 | 1;

type Nodes = Map<string, [string, string]>;

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const [rawDirections, nodeMap] = text.split('\n\n');

	const directions = rawDirections.split('').map((direction) => {
		switch (direction) {
			case 'L':
			default:
				return 0;
			case 'R':
				return 1;
		}
	}) as Direction[];

	const nodes: Nodes = new Map();

	nodeMap.split('\n').map((line) => {
		const [node, ...neighbors] = [...line.matchAll(/\w+/g)].map(String);
		nodes.set(node, neighbors as [string, string]);
	});

	return [directions, nodes] as const;
}

type NodeMap = Awaited<ReturnType<typeof getInput>>;

export function steps(
	[directions, nodes]: NodeMap,
	node: string,
	until: (node: string) => boolean
) {
	let steps = 0;

	while (!until(node)) {
		const neighbors = nodes.get(node);

		if (!neighbors || (neighbors[0] === node && neighbors[1] === node)) break;

		const direction = directions[steps % directions.length];

		node = neighbors[direction];

		steps++;
	}

	return steps;
}

export function stepsToNavigateTheNetwork(map: NodeMap) {
	return steps(map, 'AAA', (node) => node === 'ZZZ');
}

export function stepsToSimultaneouslyNavigateTheNetwork(map: NodeMap) {
	const nodes = [...map[1].keys()].filter((node) => node.at(-1) === 'A');

	return lcm(
		...nodes.map((node) => steps(map, node, (node) => node.at(-1) === 'Z'))
	);
}
