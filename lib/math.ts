export function sum(first: number, second: number) {
	return first + second;
}

export function sumAll(numbers: number[]) {
	return numbers.reduce(sum);
}

export function subtract(first: number, second: number) {
	return first - second;
}

export function subtractAll(numbers: number[]) {
	return numbers.reduce(subtract);
}

export function multiply(first: number, second: number) {
	return first * second;
}

export function multiplyAll(numbers: number[]) {
	return numbers.reduce(multiply);
}

export function divide(first: number, second: number) {
	return first / second;
}

export function divideAll(numbers: number[]) {
	return numbers.reduce(divide);
}

export function inRange(
	value: number,
	[min, max]: [min: number, max: number],
	offset = 0
) {
	return (value - (min - offset)) * (value - (max + offset)) <= 0;
}

export function quadratic(a: number, b: number, c: number) {
	const discriminant = Math.sqrt(b ** 2 - 4 * a * c);

	return [(-b + discriminant) / (2 * a), (-b - discriminant) / (2 * a)] as [
		root: number,
		root: number,
	];
}
