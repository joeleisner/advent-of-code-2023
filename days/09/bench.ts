import { bench, group } from 'mitata';
import {
	getInput,
	getSumOfPredictedNextValues,
	getSumOfPredictedPreviousValues,
} from './mod';

const histories = await getInput('./input.txt');

group({ name: '9: Mirage Maintenance', summary: false }, () => {
	bench('Sum of predicted next values', () =>
		getSumOfPredictedNextValues(histories)
	);
	bench('Sum of predicted previous values', () =>
		getSumOfPredictedPreviousValues(histories)
	);
});
