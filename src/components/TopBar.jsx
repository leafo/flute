import React from 'react';
import { getNoteNames } from '../data/fingerings.js';

const KEYS = [
    { value: 0, label: 'C' },
    { value: 1, label: 'C#/Db' },
    { value: 2, label: 'D' },
    { value: 3, label: 'D#/Eb' },
    { value: 4, label: 'E' },
    { value: 5, label: 'F' },
    { value: 6, label: 'F#/Gb' },
    { value: 7, label: 'G' },
    { value: 8, label: 'G#/Ab' },
    { value: 9, label: 'A' },
    { value: 10, label: 'A#/Bb' },
    { value: 11, label: 'B' },
];

export function TopBar({ selectedKey, onKeyChange }) {
    const noteNames = getNoteNames(selectedKey);
    // 筒音 (fundamental) is 5 semitones below the key/root
    const fundamentalIndex = ((selectedKey - 5) % 12 + 12) % 12;
    const fundamentalName = noteNames[fundamentalIndex];

    return (
        <div className="top-bar">
            <div className="key-selector">
                <label htmlFor="key-select">Key:</label>
                <select
                    id="key-select"
                    value={selectedKey}
                    onChange={(e) => onKeyChange(parseInt(e.target.value))}
                >
                    {KEYS.map(k => (
                        <option key={k.value} value={k.value}>{k.label}</option>
                    ))}
                </select>
            </div>
            <div className="info-box">
                筒音 = <span id="tongyin">{fundamentalName}</span>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-hole closed"></div>
                    <span>Closed</span>
                </div>
                <div className="legend-item">
                    <div className="legend-hole open"></div>
                    <span>Open</span>
                </div>
                <div className="legend-item">
                    <div className="legend-hole half"></div>
                    <span>Half</span>
                </div>
            </div>
        </div>
    );
}
