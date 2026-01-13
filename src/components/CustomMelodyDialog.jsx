import React, { useRef, useEffect, useState } from 'react';
import { parseLmlMelody } from '../data/lmlParser.js';

export function CustomMelodyDialog({
    isOpen,
    onClose,
    initialLml,
    onSave
}) {
    const dialogRef = useRef(null);
    const [lmlText, setLmlText] = useState(initialLml);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLmlText(initialLml);
    }, [initialLml]);

    useEffect(() => {
        if (isOpen && dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current?.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleTextChange = (e) => {
        const text = e.target.value;
        setLmlText(text);

        if (text.trim()) {
            try {
                parseLmlMelody(text);
                setError(null);
            } catch (e) {
                setError(e.message);
            }
        } else {
            setError(null);
        }
    };

    const handleSave = () => {
        if (!lmlText.trim()) {
            onSave(null, '');
            onClose();
            return;
        }

        try {
            const parsed = parseLmlMelody(lmlText);
            onSave(parsed, lmlText);
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleCancel = () => {
        setLmlText(initialLml);
        setError(null);
        onClose();
    };

    return (
        <dialog ref={dialogRef} className="custom-melody-dialog" onClose={onClose}>
            <h2>Custom Melody</h2>
            <p className="dialog-help">
                Paste LML notation below. Include <code># name: Your Melody</code> for a title.
            </p>
            <textarea
                value={lmlText}
                onChange={handleTextChange}
                placeholder={`# name: My Melody
# tempo: 100

ts4/4

m {
  c d e f
}`}
                rows={12}
            />
            {error && <div className="error-message">{error}</div>}
            <div className="dialog-buttons">
                <button onClick={handleCancel}>Cancel</button>
                <button
                    onClick={handleSave}
                    className="primary"
                    disabled={!!error && lmlText.trim()}
                >
                    Save
                </button>
            </div>
        </dialog>
    );
}
