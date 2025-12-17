import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar.jsx';
import { MelodyControls } from './components/MelodyControls.jsx';
import { FingeringGrid } from './components/FingeringGrid.jsx';
import { diatonicFingerings, chromaticFingerings } from './data/fingerings.js';
import { MelodyPlayer } from './audio/FluteSynth.js';
import './App.css';

export function App() {
    const [selectedKey, setSelectedKey] = useState(5); // Default to F
    const [selectedMelody, setSelectedMelody] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tempo, setTempo] = useState(100);
    const [highlightedSemitones, setHighlightedSemitones] = useState(null);

    const playerRef = useRef(null);

    useEffect(() => {
        playerRef.current = new MelodyPlayer(
            (semitones) => setHighlightedSemitones(semitones),
            () => setIsPlaying(false)
        );

        return () => {
            if (playerRef.current) {
                playerRef.current.stop();
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
                onMelodyChange={setSelectedMelody}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onStop={handleStop}
                tempo={tempo}
                onTempoChange={setTempo}
            />

            <div className="section-title">Diatonic Notes</div>
            <FingeringGrid
                fingerings={diatonicFingerings}
                keyOffset={selectedKey}
                isChromatic={false}
                highlightedSemitones={highlightedSemitones}
            />

            <div className="section-title">Chromatic Notes</div>
            <FingeringGrid
                fingerings={chromaticFingerings}
                keyOffset={selectedKey}
                isChromatic={true}
                highlightedSemitones={highlightedSemitones}
            />

            <footer>
                Holes 1-6 from bottom to top | Higher octave: faster air, tighter embouchure
            </footer>
        </div>
    );
}
