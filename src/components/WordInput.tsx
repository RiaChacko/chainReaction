import React, { useState } from 'react';

interface WordInputProps {
    onSubmit: (word: string) => void;
}

const WordInput: React.FC<WordInputProps> = ({ onSubmit }) => {
    const [word, setWord] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (word.trim()) {
            onSubmit(word.trim());
            setWord('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="word-input-form">
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word..."
                className="word-input"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default WordInput;
