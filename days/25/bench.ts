import { bench, group } from 'mitata';
import { getInput, getProductOfGroupSizes } from './mod';

const connections = await getInput('./input.txt');

group({ name: '25: Snowverload', summary: false }, () => {
	bench('Product of group sizes', () => getProductOfGroupSizes(connections));
});
