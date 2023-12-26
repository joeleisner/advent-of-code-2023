import { mincut } from '@graph-algorithm/minimum-cut';
import { multiply } from '../../lib/math';
import { TupleSet } from '../../lib/tuple';

export type Connection = [from: string, to: string];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	const connections = new TupleSet<Connection>();

	for (const line of text.split('\n')) {
		const [from, tos] = line.split(': ');

		for (const to of tos.split(' ')) connections.add([from, to]);
	}

	return connections;
}

export function getProductOfGroupSizes(connections: TupleSet<Connection>) {
	let connectionArray = [...connections];

	for (const [from, to] of mincut(connectionArray)) {
		connections.delete([from, to]);
		connections.delete([to, from]);
	}

	connectionArray = [...connections];

	const groups: string[][] = [];
	const components = new Set<string>(connectionArray.flat());
	const visited = new Set<string>();

	for (const component of components) {
		if (visited.has(component)) continue;

		const group: string[] = [];
		const queue = [component];

		while (queue.length) {
			const component = queue.shift()!;

			if (visited.has(component)) continue;

			visited.add(component);

			group.push(component);

			const links = connectionArray
				.filter((connection) => connection.includes(component))
				.flat();

			queue.push(...links);
		}

		groups.push(group);
	}

	return groups.map((group) => group.length).reduce(multiply);
}
