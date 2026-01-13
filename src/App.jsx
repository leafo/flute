import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar.jsx';
import { MelodyControls } from './components/MelodyControls.jsx';
import { CustomMelodyDialog } from './components/CustomMelodyDialog.jsx';
import { FingeringGrid } from './components/FingeringGrid.jsx';
import { diatonicFingerings, chromaticFingerings } from './data/fingerings.js';
import { melodies } from './data/melodies.js';
import { parseLmlMelody } from './data/lmlParser.js';
import { MelodyPlayer, FluteSynth } from './audio/FluteSynth.js';
import './App.css';

export function App() {
    const [selectedKey, setSelectedKey] = useState(2); // Default to D
    const [selectedMelody, setSelectedMelody] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tempo, setTempo] = useState(100);
    const [highlightedSemitones, setHighlightedSemitones] = useState(null);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(null);

    // Custom melody state
    const [customMelodyLml, setCustomMelodyLml] = useState(() =>
        localStorage.getItem('customMelodyLml') || ''
    );
    const [customMelody, setCustomMelody] = useState(null);
    const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

    const playerRef = useRef(null);
    const synthRef = useRef(null);

    // Resolve the current melody object
    const currentMelody = selectedMelody === 'custom'
        ? customMelody
        : melodies[selectedMelody];

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

    // Parse stored custom melody on mount
    useEffect(() => {
        if (customMelodyLml) {
            try {
                const parsed = parseLmlMelody(customMelodyLml);
                setCustomMelody(parsed);
            } catch (e) {
                console.error('Failed to parse stored custom melody:', e);
            }
        }
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
        } else if (currentMelody) {
            playerRef.current.play(currentMelody, selectedKey, tempo);
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
        if (currentMelody) {
            playerRef.current.step(currentMelody, selectedKey, tempo);
        }
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
        if (currentMelody) {
            playerRef.current.seek(currentMelody, selectedKey, delta);
        }
    };

    const handleOpenCustomDialog = () => {
        setIsCustomDialogOpen(true);
    };

    const handleCloseCustomDialog = () => {
        setIsCustomDialogOpen(false);
    };

    const handleSaveCustomMelody = (parsed, lmlText) => {
        setCustomMelody(parsed);
        setCustomMelodyLml(lmlText);
        localStorage.setItem('customMelodyLml', lmlText);

        if (parsed) {
            setSelectedMelody('custom');
        } else {
            setSelectedMelody(0);
        }
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
                customMelody={customMelody}
                onMelodyChange={handleMelodyChange}
                onOpenCustomDialog={handleOpenCustomDialog}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onStop={handleStop}
                onStep={handleStep}
                onSeek={handleSeek}
                tempo={tempo}
                onTempoChange={setTempo}
                currentNoteIndex={currentNoteIndex}
            />

            <CustomMelodyDialog
                isOpen={isCustomDialogOpen}
                onClose={handleCloseCustomDialog}
                initialLml={customMelodyLml}
                onSave={handleSaveCustomMelody}
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
