import React, { useRef, useState, useEffect } from 'react';
import './CategoriesMode.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const loadAnimalCategory = async () => {
    const response = await fetch('./animals_names.csv');  
    const text = await response.text();
    
    const animals = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return animals;
};

const loadCountriesCategory = async () => {
    const response = await fetch('./countries.csv');  
    const text = await response.text();
    
    const countries = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return countries;
};

const loadColorCategory = async () => {
    const response = await fetch('./color_names.csv');  
    const text = await response.text();
    
    const colors = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return colors;
};

const loadFoodCategory = async () => {
    const response = await fetch('./nutrition.csv'); 
    const text = await response.text();
    
    const food = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return food;
};

const loadLanguageCategory = async () => {
    const response = await fetch('./languages.csv');  
    const text = await response.text();
    
    const languages = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return languages;
};


const CATEGORIES: {
    Animals: string[];
    Color: string[];
    Countries: string[];
    Languages: string[];
    Food: string[];
} = {
    Animals: [],  
    Color: [],
    Countries: [],
    Languages: [],
    Food: []
};

const getRandomWord = (category: keyof typeof CATEGORIES): string => {
    const words = CATEGORIES[category];
    return words[Math.floor(Math.random() * words.length)];
};

const formatToMySQLDatetime = (timestamp: number) => {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};

const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

const CategoriesMode = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('Color');
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentInput, setCurrentInput] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(30);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const { userId } = useContext(UserContext);
    const [previousWords, setPreviousWords] = useState<string[]>([]);


    useEffect(() => {
        const loadCategories = async () => {
            const animals = await loadAnimalCategory();
            CATEGORIES.Animals = animals;
            const countries = await loadCountriesCategory();
            CATEGORIES.Countries = countries;
            const colors = await loadColorCategory();
            CATEGORIES.Color = colors;
            const food = await loadFoodCategory();
            CATEGORIES.Food = food;
            const languages = await loadLanguageCategory();
            CATEGORIES.Languages = languages;
        };

        loadCategories();
    }, []);

    useEffect(() => {
        if (gameStarted && !gameOver && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : prev));
            }, 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0) {
            setGameOver(true);

            return
        }
    }, [gameStarted, timer, gameOver]);

    const handleStart = () => {
        
        const categories = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        setSelectedCategory(randomCategory);

        const word = getRandomWord(randomCategory); 
        setCurrentWord(word);
        setPreviousWords([word]);
        setGameStarted(true);
        setStartTime(Date.now()); // current timestamp in ms
    };

    const validateWord = async (word: string, category: keyof typeof CATEGORIES): Promise<boolean> => {
        const validWordsForCategory = CATEGORIES[category];
        const normalizedWord = word.trim().toLowerCase();
        console.log(`Valid words for ${category}:`, validWordsForCategory);

        if (!validWordsForCategory || !validWordsForCategory.map(word => word.toLowerCase()).includes(normalizedWord)) {
            setError(`"${word}" is not a valid word for ${category}`);
            return false;
        }

        return true;

        // if (category === 'Countries') {
        //     return true;  
        // }

        // if(category === 'Languages'){
        //     return true;
        // }

        // try {
        //     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        //     if (response.ok) {
        //         return true;
        //     } else {
        //         setError(`"${word}" is not a valid word in the dictionary.`);
        //         return false;
        //     }
        // } catch (error) {
        //     setError('Error validating the word.');
        //     return false;
        // }
    };



    const handleSubmit = async () => {
        const newWord = currentInput.trim().toLowerCase();
        if (previousWords.includes(newWord)) {
            setError(`User has already used the word "${newWord}"`);
        }

        else{
                
            const lastChar = currentWord.charAt(currentWord.length - 1).toLowerCase();

            if (!newWord.startsWith(lastChar)) {
                setError(`Word must start with "${lastChar}"`);
            }

            else {
                const isValid = await validateWord(newWord, selectedCategory);
                
                if (isValid) {
                    setScore((prev) => prev + 1);
                    setError('');
                    setPreviousWords([newWord, ...previousWords]);
                    setCurrentWord(newWord);
                } else {
                    setError(`"${newWord}" is not a valid word for ${selectedCategory}`);
                }
            }
        }

        setCurrentInput('');
    };

    const handleBack = () => {
        navigate('/home');
    };

    const handleGameOver = async() => {
        try{
            const response = await fetch(`./backend/public/game/new.php`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    game_mode_id :2,
                    player_id : userId,
                    start_time : formatToMySQLDatetime(startTime!),
                    end_time : formatToMySQLDatetime(Date.now()),
                    date : getCurrentDate(),
                    score : score,
                })
            });
            const data = await response.json();
            console.log(data);                

        } catch(error){
            
            console.log(error);
        }
        
    };

    if (gameOver) {
        handleGameOver();
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

            <div className="previous-words">
                    {previousWords.slice(0, 2).map((word, i) => (
                        <div key={i} className={i === 0 ? 'word white' : 'word gray'}>
                            {word}
                        </div>
                    ))}
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
