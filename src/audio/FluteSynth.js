import { melodies } from '../data/melodies.js';

// Map scale degree + octave to semitones from root
export function degreeToSemitones(degree, octave) {
    if (degree < 0) return null; // Rest
    const degreeMap = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };
    const baseSemitones = degreeMap[degree] || 0;
    if (octave === 1) return baseSemitones - 12; // Low octave
    if (octave === 2) return baseSemitones;      // Middle octave
    return baseSemitones + 12;                   // High octave
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

    play(melodyIndex, keyOffset, tempo) {
        this.stop();
        this.synth.init();
        this.isPlaying = true;
        this.currentMelody = melodyIndex;
        this.currentNoteIndex = 0;

        const melody = melodies[melodyIndex];
        const beatsPerSecond = tempo / 60;
        let currentTime = this.synth.audioContext.currentTime + 0.1;
        const startTime = currentTime;

        melody.notes.forEach((note, index) => {
            const [degree, octave, beats] = note;
            const duration = beats / beatsPerSecond;
            const semitones = degreeToSemitones(degree, octave);

            const freq = this.synth.getFrequency(keyOffset, semitones);
            if (semitones !== null) {
                this.synth.playNote(freq, duration * 0.9, currentTime);
            }

            // Schedule highlighting and index update
            const highlightDelay = (currentTime - startTime) * 1000;
            const timeout = setTimeout(() => {
                if (this.isPlaying) {
                    this.currentNoteIndex = index;
                    if (this.onNoteChange) this.onNoteChange(semitones);
                    if (this.onIndexChange) this.onIndexChange(index);
                }
            }, highlightDelay);
            this.timeouts.push(timeout);

            currentTime += duration;
        });

        // Schedule end
        const endTimeout = setTimeout(() => {
            this.isPlaying = false;
            if (this.onNoteChange) this.onNoteChange(null);
            if (this.onIndexChange) this.onIndexChange(null);
            if (this.onPlaybackEnd) this.onPlaybackEnd();
        }, (currentTime - startTime) * 1000);
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

    step(melodyIndex, keyOffset, tempo) {
        // Reset if melody changed
        if (this.currentMelody !== melodyIndex) {
            this.currentMelody = melodyIndex;
            this.currentNoteIndex = 0;
        }

        this.synth.stop();
        this.synth.init();
        const melody = melodies[melodyIndex];

        // Reset at end of melody
        if (this.currentNoteIndex >= melody.notes.length) {
            this.currentNoteIndex = 0;
            if (this.onNoteChange) this.onNoteChange(null);
            if (this.onIndexChange) this.onIndexChange(null);
            return;
        }

        const [degree, octave, beats] = melody.notes[this.currentNoteIndex];
        const semitones = degreeToSemitones(degree, octave);
        const beatsPerSecond = tempo / 60;
        const duration = beats / beatsPerSecond;

        if (this.onIndexChange) this.onIndexChange(this.currentNoteIndex);
        if (semitones !== null) {
            const freq = this.synth.getFrequency(keyOffset, semitones);
            this.synth.playNote(freq, duration * 0.9, this.synth.audioContext.currentTime);
            if (this.onNoteChange) this.onNoteChange(semitones);
        }

        this.currentNoteIndex++;
    }

    resetStep() {
        this.currentNoteIndex = 0;
        this.currentMelody = null;
        if (this.onNoteChange) this.onNoteChange(null);
        if (this.onIndexChange) this.onIndexChange(null);
    }

    seek(melodyIndex, keyOffset, delta) {
        if (this.currentMelody !== melodyIndex) {
            this.currentMelody = melodyIndex;
            this.currentNoteIndex = 0;
        }

        const melody = melodies[melodyIndex];
        this.currentNoteIndex = Math.max(0, Math.min(melody.notes.length - 1, this.currentNoteIndex + delta));

        const [degree, octave] = melody.notes[this.currentNoteIndex];
        const semitones = degreeToSemitones(degree, octave);

        if (this.onNoteChange) this.onNoteChange(semitones);
        if (this.onIndexChange) this.onIndexChange(this.currentNoteIndex);
    }
}
