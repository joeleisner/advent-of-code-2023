import { sum } from '../../lib/math';

export type Hand = [
	card: number,
	card: number,
	card: number,
	card: number,
	card: number,
];

export type HandBid = [hand: Hand, bid: number];

export function convertHandToValues(hand: string) {
	return hand.split('').map((card) => {
		switch (card) {
			case 'T':
				return 10;
			case 'J':
				return 11;
			case 'Q':
				return 12;
			case 'K':
				return 13;
			case 'A':
				return 14;
			default:
				return Number(card);
		}
	}) as Hand;
}

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const [hand, bid] = line.split(' ');

		return [convertHandToValues(hand), Number(bid)] as HandBid;
	});
}

export function getAmountOfValues(values: Hand) {
	const unique = [...new Set(values)];
	const jokers = values.filter((value) => !value).length;
	const amounts = unique
		.filter((value) => value)
		.map(
			(uniqueValue) => values.filter((value) => value === uniqueValue).length
		)
		.sort((a, b) => a - b);

	if (jokers && amounts.length > 1) amounts[amounts.length - 1] += jokers;

	return amounts;
}

export function getType(hand: Hand) {
	const amounts = getAmountOfValues(hand);
	const difference = hand.length - amounts.length;

	switch (amounts.length) {
		case 0:
		case 1:
			return 6;
		case 2:
		case 3:
			return (
				difference + Number(amounts.includes(difference + 1)) + difference - 2
			);
		default:
			return difference;
	}
}

export function sortByType([prevHand]: HandBid, [nextHand]: HandBid) {
	const prevType = getType(prevHand);
	const nextType = getType(nextHand);

	if (prevType !== nextType) return prevType > nextType ? 1 : -1;

	let index = 0;

	while (index < 5) {
		const prevValue = prevHand[index];
		const nextValue = nextHand[index];
		if (prevValue !== nextValue) return prevValue > nextValue ? 1 : -1;
		index++;
	}

	return 0;
}

export function getTotalWinnings(handBids: HandBid[]) {
	return handBids
		.sort(sortByType)
		.map(([, bid], index) => bid * (index + 1))
		.reduce(sum);
}

export function withJokers([hand, bid]: HandBid) {
	return [hand.map((value) => (value === 11 ? 0 : value)), bid] as HandBid;
}

export function getTotalWinningsWithJokers(handBids: HandBid[]) {
	return handBids
		.map(withJokers)
		.sort(sortByType)
		.map(([, bid], index) => bid * (index + 1))
		.reduce(sum);
}
