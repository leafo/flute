import { SongParser } from '@leafo/lml';

/**
 * Convert key signature count to semitone offset from C
 * Key signatures follow circle of fifths: each sharp adds 7 semitones (mod 12)
 * @param {number} keySignatureCount - positive = sharps, negative = flats
 * @returns {number} - semitone offset (0-11)
 */
function keySignatureToOffset(keySignatureCount) {
    return ((keySignatureCount * 7) % 12 + 12) % 12;
}

/**
 * Parse LML text and return melody with SongNoteList
 * @param {string} lmlText - Raw LML text content
 * @returns {{ name: string, category: string, tempo: number, track: import('@leafo/lml').SongNoteList, startOffset: number, songKeyOffset: number }}
 */
export function parseLmlMelody(lmlText) {
    const song = SongParser.load(lmlText);
    const frontmatter = song.metadata?.frontmatter || {};

    // Get first track as SongNoteList
    const track = song.getTrack(0);

    // Get song's key from metadata and convert to offset
    const keySignatureCount = song.metadata?.keySignature ?? 0;
    const songKeyOffset = keySignatureToOffset(keySignatureCount);

    // Get start offset so first note plays immediately
    const startOffset = track.getStartInBeats();

    return {
        name: frontmatter.name || 'Unknown',
        category: frontmatter.category || 'Other',
        tempo: frontmatter.tempo ? parseInt(frontmatter.tempo, 10) : 100,
        track,
        startOffset,
        songKeyOffset
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
