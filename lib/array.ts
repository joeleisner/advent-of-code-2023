export function equals<TValue>(a: TValue[], b: TValue[]) {
	return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function swap<TValue>(array: TValue[], i: number, j: number) {
	if (i < 0) i = array.length + i;
	if (j < 0) j = array.length + j;
	[array[i], array[j]] = [array[j], array[i]];
}
