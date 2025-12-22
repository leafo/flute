import React from 'react';
import { getNoteName } from '../data/fingerings.js';

export function FingeringCard({ fingering, keyOffset, isChromatic, isHighlighted, onPlayNote }) {
    const noteName = getNoteName(keyOffset, fingering.semitones);
    const degree = fingering.degree || '';

    const classNames = [
        'fingering-card',
        isChromatic ? 'chromatic' : '',
        isHighlighted ? 'highlighted' : ''
    ].filter(Boolean).join(' ');

    const handleClick = () => {
        if (onPlayNote) {
            onPlayNote(fingering.semitones);
        }
    };

    return (
        <div className={classNames} data-semitones={fingering.semitones} onClick={handleClick}>
            <div className="note-name">{noteName}</div>
            <div className="note-octave">{fingering.octave} · {degree}</div>
            <div className="dizi-diagram">
                {fingering.holes.map((holeValue, i) => {
                    let holeClass = 'hole ';
                    if (holeValue === 1) holeClass += 'closed';
                    else if (holeValue === 0) holeClass += 'open';
                    else holeClass += 'half';
                    return <div key={i} className={holeClass} />;
                })}
            </div>
            {fingering.technique && (
                <div className="technique-note">{fingering.technique}</div>
            )}
        </div>
    );
}
