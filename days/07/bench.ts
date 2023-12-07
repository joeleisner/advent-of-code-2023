import { bench, group } from 'mitata';
import { getInput, getTotalWinnings, getTotalWinningsWithJokers } from './mod';

const input = await getInput('./input.txt');

group({ name: '7: Camel Cards', summary: false }, () => {
	bench('Get total winnings', () => getTotalWinnings(input));
	bench('Get total winnings w/ jokers', () =>
		getTotalWinningsWithJokers(input)
	);
});
