import { sumAll } from '../../lib/math';

type Card = [winning: number[], yours: number[]];

export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n').map((line) => {
		const allNumbers = line.split(':')[1];

		return allNumbers.split('|').map((numbers) => {
			return [...numbers.matchAll(/\d+/g)].map(Number);
		});
	}) as Card[];
}

export function getWinningNumberAmount([winningNumbers, yourNumbers]: Card) {
	return yourNumbers.filter((number) => winningNumbers.includes(number)).length;
}

export function getPoints(cards: Card[]) {
	let points = 0;

	for (const card of cards) {
		const winners = getWinningNumberAmount(card);

		points += Math.floor(2 ** (winners - 1));
	}

	return points;
}

export function getTotalScratchcards(cards: Card[]) {
	let total = new Array(cards.length).fill(1);

	for (const [index, card] of cards.entries()) {
		let winners = getWinningNumberAmount(card);

		while (winners) {
			total[index + winners--] += total[index];
		}
	}

	return sumAll(total);
}
