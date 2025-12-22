import React from 'react';
import { FingeringCard } from './FingeringCard.jsx';

export function FingeringGrid({ fingerings, keyOffset, isChromatic, highlightedSemitones, onPlayNote }) {
    return (
        <div className="fingering-grid">
            {fingerings.map((f, i) => (
                <FingeringCard
                    key={i}
                    fingering={f}
                    keyOffset={keyOffset}
                    isChromatic={isChromatic}
                    isHighlighted={highlightedSemitones === f.semitones}
                    onPlayNote={onPlayNote}
                />
            ))}
        </div>
    );
}
