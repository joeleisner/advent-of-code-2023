import {
	getInput,
	getSummarizedNotes,
	getSummarizedNotesWithSmudges,
} from './mod';

const patterns = await getInput('./input.txt');

const summarizedNotes = getSummarizedNotes(patterns);

console.log('Summarized notes:', summarizedNotes, '(Part 1)');

const summarizedNotesWithSmudges = getSummarizedNotesWithSmudges(patterns);

console.log(
	'Summarized notes with smudges:',
	summarizedNotesWithSmudges,
	'(Part 2)'
);
