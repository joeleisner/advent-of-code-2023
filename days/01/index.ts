import { sumAll } from '../../lib/math';
import { getCalibrationValues, getInput } from './mod';

const calibrations = await getInput('./input.txt');

const firstValues = getCalibrationValues(calibrations, false);

console.log('Sum of calibration values:', sumAll(firstValues), '(Part 1)');

const secondValues = getCalibrationValues(calibrations, true);

console.log('Sum of calibration values:', sumAll(secondValues), '(Part 2)');
