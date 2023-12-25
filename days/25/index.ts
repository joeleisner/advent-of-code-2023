import { getInput, getProductOfGroupSizes } from './mod';

const connections = await getInput('./input.txt');

const productOfGroupSizes = getProductOfGroupSizes(connections);

console.log('Product of group sizes:', productOfGroupSizes);
