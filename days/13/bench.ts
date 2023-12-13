import { bench, group } from 'mitata';
import {
	getInput,
	getSummarizedNotes,
	getSummarizedNotesWithSmudges,
} from './mod';

const patterns = await getInput('./input.txt');

group({ name: '13: Point of Incidence', summary: false }, () => {
	bench('Summarized notes', () => getSummarizedNotes(patterns));
	bench('Summarized notes with smudges', () =>
		getSummarizedNotesWithSmudges(patterns)
	);
});
