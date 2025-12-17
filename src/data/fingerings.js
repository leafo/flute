// Note names with sharps vs flats depending on key
export const noteNamesSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const noteNamesFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Keys that use flats: F, Bb, Eb, Ab, Db, Gb (indices 5, 10, 3, 8, 1, 6)
export const flatKeys = [5, 10, 3, 8, 1, 6];

export function getNoteNames(keyOffset) {
    return flatKeys.includes(keyOffset) ? noteNamesFlats : noteNamesSharps;
}

export function getNoteName(keyOffset, semitoneOffset) {
    const noteIndex = ((keyOffset + semitoneOffset) % 12 + 12) % 12;
    const noteNames = getNoteNames(keyOffset);
    return noteNames[noteIndex];
}

// Diatonic fingerings (relative to ROOT note, semitone 0 = key)
// Based on D Qudi fingering chart (Yueqi, Thrasher & Wong, 2011)
// Key insight: all open = #4, NOT 5. The 5th requires overblowing.
export const diatonicFingerings = [
    // 1st octave
    { semitones: -5, holes: [1, 1, 1, 1, 1, 1], octave: '1', degree: '5' },   // Low 5 (筒音)
    { semitones: -3, holes: [1, 1, 1, 1, 1, 0], octave: '1', degree: '6' },   // Low 6
    { semitones: -1, holes: [1, 1, 1, 1, 0, 0], octave: '1', degree: '7' },   // Low 7
    { semitones: 0,  holes: [1, 1, 1, 0, 0, 0], octave: '1', degree: '1' },   // 1 (ROOT)
    { semitones: 2,  holes: [1, 1, 0, 0, 0, 0], octave: '1', degree: '2' },   // 2
    { semitones: 4,  holes: [1, 0, 0, 0, 0, 0], octave: '1', degree: '3' },   // 3
    { semitones: 5,  holes: [0, 1, 1, 0, 0, 0], octave: '1', degree: '4' },   // 4 (forked)
    // 2nd octave (overblown) - hole 6 open triggers 2nd register
    { semitones: 7,  holes: [0, 1, 1, 1, 1, 1], octave: '2', degree: '5' },   // 5 (overblown!)
    { semitones: 9,  holes: [0, 1, 1, 1, 1, 0], octave: '2', degree: '6' },   // 6
    { semitones: 11, holes: [0, 1, 1, 1, 0, 0], octave: '2', degree: '7' },   // 7
    { semitones: 12, holes: [0, 1, 1, 0, 0, 0], octave: '2', degree: '1' },   // High 1
    { semitones: 14, holes: [0, 1, 0, 0, 0, 0], octave: '2', degree: '2' },   // High 2
    { semitones: 16, holes: [0, 0, 0, 0, 0, 0], octave: '2', degree: '3' },   // High 3 (all open, overblown)
];

// Chromatic fingerings (relative to ROOT note, semitone 0 = key)
export const chromaticFingerings = [
    // 1st octave chromatics
    { semitones: -4, holes: [1, 1, 1, 1, 1, 0.5], octave: '1', degree: '#5', technique: '½' },  // Low #5
    { semitones: -2, holes: [1, 1, 1, 1, 0.5, 0], octave: '1', degree: 'b7', technique: '½' },  // Low b7
    { semitones: 1,  holes: [1, 1, 0.5, 0, 0, 0], octave: '1', degree: '#1', technique: '½' },  // #1
    { semitones: 3,  holes: [1, 0.5, 0, 0, 0, 0], octave: '1', degree: 'b3', technique: '½' },  // b3
    { semitones: 6,  holes: [0, 1, 0, 0, 0, 0], octave: '1', degree: '#4', technique: '½' },    // #4 (alt)
    { semitones: 6,  holes: [0, 0, 0, 0, 0, 0], octave: '1', degree: '#4' },                    // #4 (all open!)
    // 2nd octave chromatics
    { semitones: 8,  holes: [0, 1, 1, 1, 1, 0.5], octave: '2', degree: '#5', technique: '½' },  // #5
    { semitones: 10, holes: [0, 1, 1, 1, 0.5, 0], octave: '2', degree: 'b7', technique: '½' },  // b7
    { semitones: 13, holes: [0, 1, 0.5, 0, 0, 0], octave: '2', degree: '#1', technique: '½' },  // High #1
    { semitones: 15, holes: [0, 0.5, 0, 0, 0, 0], octave: '2', degree: 'b3', technique: '½' },  // High b3
];
