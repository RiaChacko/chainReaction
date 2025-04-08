import React, { useState, useEffect } from 'react';
import './CategoriesMode.css';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = {
    Animals: ['Lion', 'Elephant', 'Cat', 'Dog', 'Tiger'],
    Food: ['Apple', 'Banana', 'Carrot', 'Pizza', 'Sushi'],
    Countries: ['India', 'USA', 'Australia', 'Japan', 'Brazil'],
    Sports: ['Soccer', 'Basketball', 'Tennis', 'Cricket', 'Baseball'],
    Movies: ['Inception', 'Titanic', 'Avatar', 'Shawshank', 'Matrix']
};


const getRandomCategory = (): keyof typeof CATEGORIES => {
    const categories = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];
    return categories[Math.floor(Math.random() * categories.length)];
};


const getRandomWord = (category: keyof typeof CATEGORIES): string => {
    const words = CATEGORIES[category];
    return words[Math.floor(Math.random() * words.length)];
};

const CategoriesMode = () => {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('Animals');
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentInput, setCurrentInput] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(20);  
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        if (gameStarted && !gameOver && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0) {
            setGameOver(true);
        }
    }, [gameStarted, timer, gameOver]);

    const handleStart = () => {
        const category = getRandomCategory();
        setSelectedCategory(category);
        const word = getRandomWord(category);
        setCurrentWord(word);
        setGameStarted(true);
    };

    
    const validateWord = async (word: string, category: keyof typeof CATEGORIES): Promise<boolean> => {
        
        const validWordsForCategory = CATEGORIES[category];
        if (!validWordsForCategory || !validWordsForCategory.includes(word.toLowerCase())) {
            setError(`"${word}" is not a valid word for ${category}`);
            return false;
        }


        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.ok) {
                return true;
            } else {
                setError(`"${word}" is not a valid word in the dictionary.`);
                return false;
            }
        } catch (error) {
            setError('Error validating the word.');
            return false;
        }
    };

    const handleSubmit = async () => {
        const newWord = currentInput.trim().toLowerCase();

        const isValid = await validateWord(newWord, selectedCategory);

        if (isValid) {
            setScore((prev) => prev + 1);
            setError('');
            const nextWord = getRandomWord(selectedCategory);
            setCurrentWord(nextWord);
        } else {
            setError(`"${newWord}" is not a valid word for ${selectedCategory}`);
        }

        setCurrentInput('');
    };

    const handleBack = () => {
        navigate('/home');
    };

    if (gameOver) {
        return (
            <div className="categories-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">Time's Up!</h1>
                <p className="result">✅ Your Score: {score}</p>
                <button onClick={handleBack} className="submit-btn">Back to Home</button>
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <div className="categories-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">Categories Mode</h1>
                <p className="category-text">Category: {selectedCategory}</p>
                <button onClick={handleStart} className="start-btn">Start Game</button>
            </div>
        );
    }


    return (
        <div className="categories-container">
            <h1 className="title">MATCH THE WORD</h1>

            <div className="top-row">
                <div className="category-name">
                    Category: {selectedCategory}
                </div>
                <div className="timer">:{timer}</div>
            </div>

            <div className="current-word">
                <h3>Current Word: {currentWord}</h3>
            </div>

            <input
                type="text"
                className="word-input"
                placeholder={`Enter a word from ${selectedCategory}`}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={gameOver}
            />

            <button onClick={handleSubmit} className="submit-btn" disabled={gameOver}>
                Submit
            </button>

            {error && <p className="error">{error}</p>}

            <button onClick={handleBack} className="back-btn">← Back</button>
        </div>
    );
};

export default CategoriesMode;
