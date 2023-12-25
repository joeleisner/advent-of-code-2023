import { describe, expect, test } from 'bun:test';
import { TupleSet } from '../../lib/tuple';
import { getInput, getProductOfGroupSizes } from './mod';

describe('Day 25: Snowverload', async () => {
	test('Get input', async () => {
		expect(await getInput('./input_test.txt')).toEqual(
			new TupleSet([
				['jqt', 'rhn'],
				['jqt', 'xhk'],
				['jqt', 'nvd'],
				['rsh', 'frs'],
				['rsh', 'pzl'],
				['rsh', 'lsr'],
				['xhk', 'hfx'],
				['cmg', 'qnr'],
				['cmg', 'nvd'],
				['cmg', 'lhk'],
				['cmg', 'bvb'],
				['rhn', 'xhk'],
				['rhn', 'bvb'],
				['rhn', 'hfx'],
				['bvb', 'xhk'],
				['bvb', 'hfx'],
				['pzl', 'lsr'],
				['pzl', 'hfx'],
				['pzl', 'nvd'],
				['qnr', 'nvd'],
				['ntq', 'jqt'],
				['ntq', 'hfx'],
				['ntq', 'bvb'],
				['ntq', 'xhk'],
				['nvd', 'lhk'],
				['lsr', 'lhk'],
				['rzs', 'qnr'],
				['rzs', 'cmg'],
				['rzs', 'lsr'],
				['rzs', 'rsh'],
				['frs', 'qnr'],
				['frs', 'lhk'],
				['frs', 'lsr'],
			])
		);
	});

	const connections = await getInput('./input_test.txt');

	test('Get product of group sizes', () => {
		expect(getProductOfGroupSizes(connections)).toBe(54);
	});
});
