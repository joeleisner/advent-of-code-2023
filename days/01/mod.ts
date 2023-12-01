export async function getInput(path: string) {
	const file = Bun.file(new URL(path, import.meta.url));

	const text = await file.text();

	return text.split('\n');
}

const spelledOutDigits: Map<string, string> = new Map([
	['one', '1'],
	['two', '2'],
	['three', '3'],
	['four', '4'],
	['five', '5'],
	['six', '6'],
	['seven', '7'],
	['eight', '8'],
	['nine', '9'],
]);

export function getCalibrationValues(
	calibrations: string[],
	withSpelledOutDigits: boolean
) {
	const digitsMatcher = withSpelledOutDigits
		? new RegExp(`(?=(\\d|${[...spelledOutDigits.keys()].join('|')}))`, 'g')
		: /(?=(\d))/g;

	return calibrations.map((calibration) => {
		const digits = Array.from(
			[...calibration.matchAll(digitsMatcher)],
			(match) => match[1]
		);

		if (!digits.length) return 0;

		const firstDigit = spelledOutDigits.get(digits.at(0)!) || digits.at(0)!;

		const lastDigit = spelledOutDigits.get(digits.at(-1)!) || digits.at(-1)!;

		return +(firstDigit + lastDigit);
	});
}
