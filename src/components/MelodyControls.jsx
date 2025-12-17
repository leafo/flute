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
    tempo,
    onTempoChange
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
        </div>
    );
}
