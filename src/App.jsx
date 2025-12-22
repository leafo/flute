import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar.jsx';
import { MelodyControls } from './components/MelodyControls.jsx';
import { FingeringGrid } from './components/FingeringGrid.jsx';
import { diatonicFingerings, chromaticFingerings } from './data/fingerings.js';
import { MelodyPlayer, FluteSynth } from './audio/FluteSynth.js';
import './App.css';

export function App() {
    const [selectedKey, setSelectedKey] = useState(2); // Default to D
    const [selectedMelody, setSelectedMelody] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tempo, setTempo] = useState(100);
    const [highlightedSemitones, setHighlightedSemitones] = useState(null);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(null);

    const playerRef = useRef(null);
    const synthRef = useRef(null);

    useEffect(() => {
        synthRef.current = new FluteSynth();
        playerRef.current = new MelodyPlayer(
            (semitones) => setHighlightedSemitones(semitones),
            () => setIsPlaying(false),
            (index) => setCurrentNoteIndex(index)
        );

        return () => {
            if (playerRef.current) {
                playerRef.current.stop();
            }
            if (synthRef.current) {
                synthRef.current.stop();
            }
        };
    }, []);

    const handleKeyChange = (key) => {
        setSelectedKey(key);
        if (playerRef.current) {
            playerRef.current.stop();
            setIsPlaying(false);
        }
    };

    const handlePlay = () => {
        if (isPlaying) {
            playerRef.current.stop();
            setIsPlaying(false);
        } else {
            playerRef.current.play(selectedMelody, selectedKey, tempo);
            setIsPlaying(true);
        }
    };

    const handleStop = () => {
        playerRef.current.stop();
        setIsPlaying(false);
    };

    const handleStep = () => {
        if (isPlaying) {
            playerRef.current.stop();
            setIsPlaying(false);
        }
        playerRef.current.step(selectedMelody, selectedKey, tempo);
    };

    const handleMelodyChange = (index) => {
        setSelectedMelody(index);
        playerRef.current.resetStep();
    };

    const handleSeek = (delta) => {
        if (isPlaying) {
            playerRef.current.stop();
            setIsPlaying(false);
        }
        playerRef.current.seek(selectedMelody, selectedKey, delta);
    };

    const handlePlayNote = (semitones) => {
        synthRef.current.init();
        const freq = synthRef.current.getFrequency(selectedKey, semitones);
        synthRef.current.playNote(freq, 0.5, synthRef.current.audioContext.currentTime);
    };

    return (
        <div className="container">
            <header>
                <h1>Dizi Fingering Chart</h1>
            </header>

            <TopBar
                selectedKey={selectedKey}
                onKeyChange={handleKeyChange}
            />

            <MelodyControls
                selectedMelody={selectedMelody}
                onMelodyChange={handleMelodyChange}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onStop={handleStop}
                onStep={handleStep}
                onSeek={handleSeek}
                tempo={tempo}
                onTempoChange={setTempo}
                currentNoteIndex={currentNoteIndex}
            />

            <div className="section-title">Diatonic Notes</div>
            <FingeringGrid
                fingerings={diatonicFingerings}
                keyOffset={selectedKey}
                isChromatic={false}
                highlightedSemitones={highlightedSemitones}
                onPlayNote={handlePlayNote}
            />

            <div className="section-title">Chromatic Notes</div>
            <FingeringGrid
                fingerings={chromaticFingerings}
                keyOffset={selectedKey}
                isChromatic={true}
                highlightedSemitones={highlightedSemitones}
                onPlayNote={handlePlayNote}
            />

            <footer>
                Holes 1-6 from bottom to top | Higher octave: faster air, tighter embouchure
            </footer>
        </div>
    );
}
