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

export function matchDigits(
	calibration: string,
	withSpelledOutDigits: boolean
) {
	const matcher = new RegExp(
		`(?=(\\d${
			withSpelledOutDigits ? '|' + [...spelledOutDigits.keys()].join('|') : ''
		}))`,
		'g'
	);

	return Array.from(
		calibration.matchAll(matcher),
		([, match]) => spelledOutDigits.get(match) || match
	);
}

export function getCalibrationValues(
	calibrations: string[],
	withSpelledOutDigits: boolean
) {
	return calibrations.map((calibration) => {
		const {
			length,
			0: firstDigit,
			[length - 1]: lastDigit,
		} = matchDigits(calibration, withSpelledOutDigits);

		return length ? +(firstDigit + lastDigit) : 0;
	});
}
