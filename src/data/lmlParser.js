import { SongParser, KeySignature } from '@leafo/lml';

// LML octave offset: LML octave 4 = app octave 2 (middle C4=MIDI 60)
const LML_OCTAVE_OFFSET = 2;

/**
 * Convert a SongNote to [degree, octave, beats] format
 * @param {import('@leafo/lml').SongNote} songNote
 * @param {import('@leafo/lml').MajorScale} scale
 * @returns {[number, number, number]}
 */
function songNoteToTuple(songNote, scale) {
    const { note, duration } = songNote;

    // Get the scale degree using LML's music theory API
    const degree = scale.getDegree(note);

    // Extract octave from note name (e.g., "C4" -> 4)
    const octaveMatch = note.match(/(\d+)$/);
    if (!octaveMatch) {
        throw new Error(`Invalid note format: ${note}`);
    }
    const lmlOctave = parseInt(octaveMatch[1], 10);

    // Convert LML octave to app octave
    const appOctave = lmlOctave - LML_OCTAVE_OFFSET;

    return [degree, appOctave, duration];
}

/**
 * Parse LML text and convert to melody format
 * @param {string} lmlText - Raw LML text content
 * @returns {{ name: string, category: string, tempo: number, notes: Array }}
 */
export function parseLmlMelody(lmlText) {
    // Parse the LML using SongParser
    const song = SongParser.load(lmlText);

    // Get metadata from frontmatter
    const frontmatter = song.metadata.frontmatter || {};

    // Get the scale from the song's key signature (metadata.keySignature is a number)
    const keySignature = KeySignature.forCount(song.metadata.keySignature ?? 0);
    const scale = keySignature.defaultScale();

    // Convert notes, inserting rests for gaps
    const notes = [];
    let expectedStart = 0;
    const epsilon = 0.001;

    for (const songNote of song) {
        const noteStart = songNote.start;

        // If there's a gap, insert a rest
        if (noteStart > expectedStart + epsilon) {
            const restDuration = noteStart - expectedStart;
            notes.push([-1, 1, restDuration]);
        }

        notes.push(songNoteToTuple(songNote, scale));
        expectedStart = noteStart + songNote.duration;
    }

    return {
        name: frontmatter.name || 'Unknown',
        category: frontmatter.category || 'Other',
        tempo: frontmatter.tempo ? parseInt(frontmatter.tempo, 10) : 100,
        notes
    };
}

/**
 * Convenience wrapper for use in melodies.js
 */
export function lml(lmlText) {
    try {
        return parseLmlMelody(lmlText);
    } catch (error) {
        console.error('Failed to parse LML:');
        console.error(lmlText);
        console.error('Error:', error);
        throw error;
    }
}
