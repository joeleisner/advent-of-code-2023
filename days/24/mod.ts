import { inRange, Range, sum } from '../../lib/math';
import { init as initZ3 } from 'z3-solver';
import { assert } from '../../lib/assert';

export type Hailstone = [
	px: number,
	py: number,
	pz: number,
	vx: number,
	vy: number,
	vz: number,
];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const [positions, velocities] = line.split('@');
		const [px, py, pz] = positions.split(',').map(Number);
		const [vx, vy, vz] = velocities.split(',').map(Number);

		return [px, py, pz, vx, vy, vz] as Hailstone;
	});
}

export function inArea(x: number, y: number, area: Range) {
	return inRange(x, area) && inRange(y, area);
}

export function getIntersections(
	hailstones: Hailstone[],
	area: Range = [200_000_000_000_000, 400_000_000_000_000]
) {
	let intersections = 0;

	for (const [index, [apx, apy, , avx, avy]] of hailstones.entries()) {
		const am = avy / avx;
		for (const [bpx, bpy, , bvx, bvy] of hailstones.slice(0, index)) {
			const bm = bvy / bvx;

			const x = (am * apx - bm * bpx + bpy - apy) / (am - bm);
			const y = am * (x - apx) + apy;

			const ta = (x - apx) / avx;
			const tb = (x - bpx) / bvx;

			// In the past
			if (ta <= 0 || tb <= 0) continue;

			// Outside area
			if (!inArea(x, y, area)) continue;

			intersections++;
		}
	}

	return intersections;
}

export async function getStartingCoordinateSum(hailstones: Hailstone[]) {
	const { Context } = await initZ3();
	const { Real, Solver } = Context('main');

	const x = Real.const('x');
	const y = Real.const('y');
	const z = Real.const('z');

	const vx = Real.const('vx');
	const vy = Real.const('vy');
	const vz = Real.const('vz');

	const solver = new Solver();

	for (const [index, [hx, hy, hz, hvx, hvy, hvz]] of hailstones
		.slice(0, 3)
		.entries()) {
		const t = Real.const(`t${index}`);

		solver.add(t.ge(0));
		solver.add(x.add(vx.mul(t)).eq(t.mul(hvx).add(hx)));
		solver.add(y.add(vy.mul(t)).eq(t.mul(hvy).add(hy)));
		solver.add(z.add(vz.mul(t)).eq(t.mul(hvz).add(hz)));
	}

	const satisfied = await solver.check();

	assert(satisfied === 'sat', 'Z3 solver unsatisfied');

	const model = solver.model();

	return [model.eval(x), model.eval(y), model.eval(z)].map(Number).reduce(sum);
}
