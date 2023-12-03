import { getSumOfCalibrationValues, getInput } from './mod';

const calibrations = await getInput('./input.txt');

const firstSumOfCalibrationValues = getSumOfCalibrationValues(
	calibrations,
	false
);

console.log(
	'Sum of calibration values:',
	firstSumOfCalibrationValues,
	'(Part 1)'
);

const secondSumOfCalibrationValues = getSumOfCalibrationValues(
	calibrations,
	true
);

console.log(
	'Sum of calibration values:',
	secondSumOfCalibrationValues,
	'(Part 2)'
);
