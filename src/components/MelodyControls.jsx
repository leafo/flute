import React from 'react';
import { melodies } from '../data/melodies.js';

// Group melodies by category
function getMelodiesByCategory() {
    const groups = {};
    melodies.forEach((m, i) => {
        const category = m.category || 'Other';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push({ ...m, index: i });
    });
    return groups;
}

export function MelodyControls({
    selectedMelody,
    customMelody,
    onMelodyChange,
    onOpenCustomDialog,
    isPlaying,
    onPlay,
    onStop,
    onStep,
    onSeek,
    tempo,
    onTempoChange,
    currentNoteIndex
}) {
    const melodiesByCategory = getMelodiesByCategory();

    // Resolve track for progress indicator
    const currentTrack = selectedMelody === 'custom'
        ? customMelody?.track
        : melodies[selectedMelody]?.track;

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            onMelodyChange('custom');
            onOpenCustomDialog();
        } else {
            onMelodyChange(parseInt(value));
        }
    };

    return (
        <div className="melody-section">
            <div className="melody-selector">
                <select
                    id="melody-select"
                    value={selectedMelody}
                    onChange={handleSelectChange}
                >
                    {Object.entries(melodiesByCategory).map(([category, categoryMelodies]) => (
                        <optgroup key={category} label={category}>
                            {categoryMelodies.map((m) => (
                                <option key={m.index} value={m.index}>{m.name}</option>
                            ))}
                        </optgroup>
                    ))}
                    <optgroup label="Custom">
                        <option value="custom">
                            {customMelody ? customMelody.name : 'Custom...'}
                        </option>
                    </optgroup>
                </select>
                {selectedMelody === 'custom' && (
                    <button onClick={onOpenCustomDialog} className="edit-custom-btn">
                        Edit
                    </button>
                )}
            </div>
            <div className="melody-controls">
                <button id="play-btn" onClick={onPlay}>
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button id="stop-btn" onClick={onStop}>■ Stop</button>
                <button
                    id="step-btn"
                    onClick={onStep}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            onSeek(-1);
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            onSeek(1);
                        }
                    }}
                >⏭ Step</button>
            </div>
            <div className="tempo-control">
                <label>Tempo:</label>
                <input
                    type="range"
                    id="tempo-slider"
                    min="60"
                    max="180"
                    value={tempo}
                    onChange={(e) => onTempoChange(parseInt(e.target.value))}
                />
                <span className="tempo-value" id="tempo-display">{tempo} BPM</span>
            </div>
            <div className="progress-indicator">
                {currentTrack && [...currentTrack].map((songNote, i) => {
                    const isActive = currentNoteIndex === i;
                    return (
                        <div
                            key={i}
                            className={`progress-tick ${isActive ? 'active' : ''}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
