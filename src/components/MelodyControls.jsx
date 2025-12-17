import React from 'react';
import { melodies } from '../data/melodies.js';

export function MelodyControls({
    selectedMelody,
    onMelodyChange,
    isPlaying,
    onPlay,
    onStop,
    tempo,
    onTempoChange
}) {
    return (
        <div className="melody-section">
            <div className="melody-selector">
                <select
                    id="melody-select"
                    value={selectedMelody}
                    onChange={(e) => onMelodyChange(parseInt(e.target.value))}
                >
                    {melodies.map((m, i) => (
                        <option key={i} value={i}>{m.name}</option>
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
