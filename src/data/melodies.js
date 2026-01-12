import { lml } from './lmlParser.js';

// Import LML files as raw text (esbuild text loader)
import amazingGraceLml from './melodies/amazing-grace.lml';

// Parse LML files into melody format
// The parsed format is compatible with the existing playback system:
// { name: string, category: string, tempo: number, notes: [[degree, octave, beats], ...] }
export const melodies = [
    lml(amazingGraceLml),
];
