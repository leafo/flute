import { parseNote, MIDDLE_C_PITCH } from '@leafo/lml';

// Dizi range relative to key root (semitones)
const DIZI_RANGE_LOW = -5;   // low 5 (筒音)
const DIZI_RANGE_HIGH = 16;  // high 3

/**
 * Calculate octave shift needed to fit melody within dizi range
 * @param {string} lowestNote - e.g., "C4"
 * @param {string} highestNote - e.g., "G5"
 * @param {number} keyOffset - semitones from C (0-11)
 * @returns {number} - number of octaves to shift (positive = up)
 */
function calculateOctaveShift(lowestNote, highestNote, keyOffset) {
    const keyRootPitch = MIDDLE_C_PITCH + keyOffset;
    const diziLow = keyRootPitch + DIZI_RANGE_LOW;
    const diziHigh = keyRootPitch + DIZI_RANGE_HIGH;

    const melodyLow = parseNote(lowestNote);
    const melodyHigh = parseNote(highestNote);

    if (melodyLow < diziLow) {
        return Math.ceil((diziLow - melodyLow) / 12);
    }
    if (melodyHigh > diziHigh) {
        return -Math.ceil((melodyHigh - diziHigh) / 12);
    }
    return 0;
}

/**
 * Transpose a track to fit the target key and dizi range
 * @param {import('@leafo/lml').SongNoteList} track
 * @param {number} songKeyOffset - original song key offset (0-11)
 * @param {number} targetKeyOffset - target dizi key offset (0-11)
 * @returns {import('@leafo/lml').SongNoteList} - transposed track
 */
function transposeTrackForKey(track, songKeyOffset, targetKeyOffset) {
    // Calculate key transposition
    const keyTransposition = targetKeyOffset - songKeyOffset;

    // Apply key transposition
    let transposedTrack = keyTransposition !== 0
        ? track.transpose(keyTransposition)
        : track;

    // Fit to dizi range (octave shifts)
    const range = transposedTrack.noteRange();
    if (range) {
        const [lowest, highest] = range;
        const octaveShift = calculateOctaveShift(lowest, highest, targetKeyOffset);
        if (octaveShift !== 0) {
            transposedTrack = transposedTrack.transpose(octaveShift * 12);
        }
    }

    return transposedTrack;
}

// Flute synthesizer using Web Audio API
export class FluteSynth {
    constructor() {
        this.audioContext = null;
        this.activeNodes = [];
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    getFrequency(keyOffset, semitones) {
        // A4 = 440Hz, calculate frequency for any note
        // Key F (5) at root (semitones 0) = F4 = 349.23 Hz
        const rootFreq = 440 * Math.pow(2, (keyOffset - 9) / 12);
        return rootFreq * Math.pow(2, semitones / 12);
    }

    getFrequencyFromPitch(midiPitch) {
        // Convert MIDI pitch to frequency (A4 = 440Hz = MIDI 69)
        return 440 * Math.pow(2, (midiPitch - 69) / 12);
    }

    playNote(frequency, duration, startTime) {
        const ctx = this.audioContext;

        // Main oscillator (sine for flute-like pure tone)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = frequency;

        // Second harmonic (octave, quieter)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = frequency * 2;

        // Third harmonic (even quieter)
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.value = frequency * 3;

        // Gain nodes for mixing harmonics
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const gain3 = ctx.createGain();

        gain1.gain.value = 0.5;
        gain2.gain.value = 0.15;
        gain3.gain.value = 0.05;

        // Master envelope
        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, startTime);
        envelope.gain.linearRampToValueAtTime(0.4, startTime + 0.05); // Attack
        envelope.gain.exponentialRampToValueAtTime(0.3, startTime + 0.1); // Decay
        envelope.gain.setValueAtTime(0.3, startTime + duration - 0.05); // Sustain
        envelope.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Release

        // Connect oscillators through gains to envelope
        osc1.connect(gain1).connect(envelope);
        osc2.connect(gain2).connect(envelope);
        osc3.connect(gain3).connect(envelope);
        envelope.connect(ctx.destination);

        // Schedule start/stop
        osc1.start(startTime);
        osc2.start(startTime);
        osc3.start(startTime);
        osc1.stop(startTime + duration);
        osc2.stop(startTime + duration);
        osc3.stop(startTime + duration);

        this.activeNodes.push(osc1, osc2, osc3);
    }

    stop() {
        this.activeNodes.forEach(node => {
            try { node.stop(); } catch (e) {}
        });
        this.activeNodes = [];
    }
}

// Melody player with highlighting callback
export class MelodyPlayer {
    constructor(onNoteChange, onPlaybackEnd, onIndexChange) {
        this.synth = new FluteSynth();
        this.isPlaying = false;
        this.timeouts = [];
        this.onNoteChange = onNoteChange;
        this.onPlaybackEnd = onPlaybackEnd;
        this.onIndexChange = onIndexChange;
        // Step mode state
        this.currentMelody = null;
        this.currentNoteIndex = 0;
    }

    play(melody, keyOffset, tempo) {
        this.stop();
        this.synth.init();
        this.isPlaying = true;
        this.currentMelody = melody;
        this.currentNoteIndex = 0;

        const { track, startOffset, songKeyOffset } = melody;

        // Transpose track to target key and fit to dizi range
        const transposedTrack = transposeTrackForKey(track, songKeyOffset, keyOffset);

        const beatsPerSecond = tempo / 60;
        const keyRootPitch = MIDDLE_C_PITCH + keyOffset;
        const audioStartTime = this.synth.audioContext.currentTime + 0.1;

        // Convert track to array for indexing
        const notes = [...transposedTrack];

        notes.forEach((songNote, index) => {
            const pitch = parseNote(songNote.note);
            const freq = this.synth.getFrequencyFromPitch(pitch);
            const noteStartBeats = songNote.start - startOffset;
            const noteStartTime = audioStartTime + (noteStartBeats / beatsPerSecond);
            const duration = songNote.duration / beatsPerSecond;

            // Play the note
            this.synth.playNote(freq, duration * 0.9, noteStartTime);

            // Calculate relative semitones for fingering highlight
            const relativeSemitones = pitch - keyRootPitch;

            // Schedule highlighting and index update
            const highlightDelay = (noteStartTime - audioStartTime) * 1000;
            const timeout = setTimeout(() => {
                if (this.isPlaying) {
                    this.currentNoteIndex = index;
                    if (this.onNoteChange) this.onNoteChange(relativeSemitones);
                    if (this.onIndexChange) this.onIndexChange(index);
                }
            }, highlightDelay);
            this.timeouts.push(timeout);
        });

        // Schedule end based on track duration
        const totalDuration = (transposedTrack.getStopInBeats() - startOffset) / beatsPerSecond;
        const endTimeout = setTimeout(() => {
            this.isPlaying = false;
            if (this.onNoteChange) this.onNoteChange(null);
            if (this.onIndexChange) this.onIndexChange(null);
            if (this.onPlaybackEnd) this.onPlaybackEnd();
        }, totalDuration * 1000);
        this.timeouts.push(endTimeout);
    }

    stop() {
        this.isPlaying = false;
        this.synth.stop();
        this.timeouts.forEach(t => clearTimeout(t));
        this.timeouts = [];
        if (this.onNoteChange) this.onNoteChange(null);
        if (this.onIndexChange) this.onIndexChange(null);
    }

    step(melody, keyOffset, tempo) {
        // Reset if melody changed
        if (this.currentMelody !== melody) {
            this.currentMelody = melody;
            this.currentNoteIndex = 0;
        }

        this.synth.stop();
        this.synth.init();
        const { track, songKeyOffset } = melody;

        // Transpose track to target key and fit to dizi range
        const transposedTrack = transposeTrackForKey(track, songKeyOffset, keyOffset);
        const notes = [...transposedTrack];

        // Reset at end of melody
        if (this.currentNoteIndex >= notes.length) {
            this.currentNoteIndex = 0;
            if (this.onNoteChange) this.onNoteChange(null);
            if (this.onIndexChange) this.onIndexChange(null);
            return;
        }

        const songNote = notes[this.currentNoteIndex];
        const pitch = parseNote(songNote.note);
        const freq = this.synth.getFrequencyFromPitch(pitch);
        const beatsPerSecond = tempo / 60;
        const duration = songNote.duration / beatsPerSecond;

        // Calculate relative semitones for fingering highlight
        const keyRootPitch = MIDDLE_C_PITCH + keyOffset;
        const relativeSemitones = pitch - keyRootPitch;

        if (this.onIndexChange) this.onIndexChange(this.currentNoteIndex);
        this.synth.playNote(freq, duration * 0.9, this.synth.audioContext.currentTime);
        if (this.onNoteChange) this.onNoteChange(relativeSemitones);

        this.currentNoteIndex++;
    }

    resetStep() {
        this.currentNoteIndex = 0;
        this.currentMelody = null;
        if (this.onNoteChange) this.onNoteChange(null);
        if (this.onIndexChange) this.onIndexChange(null);
    }

    seek(melody, keyOffset, delta) {
        if (this.currentMelody !== melody) {
            this.currentMelody = melody;
            this.currentNoteIndex = 0;
        }

        const { track, songKeyOffset } = melody;

        // Transpose track to target key and fit to dizi range
        const transposedTrack = transposeTrackForKey(track, songKeyOffset, keyOffset);
        const notes = [...transposedTrack];
        this.currentNoteIndex = Math.max(0, Math.min(notes.length - 1, this.currentNoteIndex + delta));

        const songNote = notes[this.currentNoteIndex];
        const pitch = parseNote(songNote.note);

        // Calculate relative semitones for fingering highlight
        const keyRootPitch = MIDDLE_C_PITCH + keyOffset;
        const relativeSemitones = pitch - keyRootPitch;

        if (this.onNoteChange) this.onNoteChange(relativeSemitones);
        if (this.onIndexChange) this.onIndexChange(this.currentNoteIndex);
    }
}
