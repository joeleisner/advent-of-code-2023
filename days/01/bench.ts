import { bench, group } from 'mitata';
import { getSumOfCalibrationValues, getInput } from './mod';

const calibrations = await getInput('./input.txt');

group({ name: 'Day 1: Trebuchet?!', summary: false }, () => {
	bench('Sum of calibration values', () =>
		getSumOfCalibrationValues(calibrations, false)
	);
	bench('Sum of calibration values', () =>
		getSumOfCalibrationValues(calibrations, true)
	);
});
