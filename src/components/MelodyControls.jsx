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
    onMelodyChange,
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

    return (
        <div className="melody-section">
            <div className="melody-selector">
                <select
                    id="melody-select"
                    value={selectedMelody}
                    onChange={(e) => onMelodyChange(parseInt(e.target.value))}
                >
                    {Object.entries(melodiesByCategory).map(([category, categoryMelodies]) => (
                        <optgroup key={category} label={category}>
                            {categoryMelodies.map((m) => (
                                <option key={m.index} value={m.index}>{m.name}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
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
                {melodies[selectedMelody]?.notes?.map((note, i) => {
                    const isRest = note[0] < 0;
                    const isActive = currentNoteIndex === i;
                    return (
                        <div
                            key={i}
                            className={`progress-tick ${isActive ? 'active' : ''} ${isRest ? 'rest' : ''}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
