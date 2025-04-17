import React, { useState, useEffect } from 'react';
import './LetterMode.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { valid } from 'semver';

const WORD_LISTS: { [length: number]: string[] } = {
    4: ['star', 'fish', 'tree', 'gate', 'drop', 'book'],
    5: ['eagle', 'train', 'flame', 'crane', 'plant', 'smile'],
    6: ['planet', 'travel', 'pickle', 'rocket', 'breeze'],
    7: ['fortune', 'picture', 'harmony', 'justice'],
    8: ['elephant', 'painting', 'champion', 'shoulder'],
};

const getRandomWord = (length: number) => {
    const list = WORD_LISTS[length] || [];
    return list[Math.floor(Math.random() * list.length)] || 'train';
};

const formatToMySQLDatetime = (timestamp: number) => {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};

const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

const LetterMode = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    const [selectedLength, setSelectedLength] = useState<number | null>(null);
    const [timer, setTimer] = useState(60);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [previousWords, setPreviousWords] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [validCount, setValidCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { userId, username } = useContext(UserContext);


    // Timer logic
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        if (timer === 0) {
            setGameOver(true);
            setEndTime(Date.now()); 

            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : prev));
        }, 1000);

        return () => clearInterval(interval);
    }, [gameStarted, timer, gameOver]);

    const validateWord = async (word: string): Promise<boolean> => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.ok;
        } catch {
            return false;
        }
    };

    const handleSubmit = async () => {
        const lastWord = previousWords[0];
        const lastChar = lastWord.charAt(lastWord.length - 1).toLowerCase();
        const newWord = currentInput.trim().toLowerCase();

        if (!newWord.startsWith(lastChar)) {
            setError(`Word must start with "${lastChar}"`);
            setCurrentInput('');
            return;
        }

        if (newWord.length !== selectedLength) {
            setError(`Word must be exactly ${selectedLength} letters`);
            setCurrentInput('');
            return;
        }

        const isValid = await validateWord(newWord);
        setTotalCount((prev) => prev + 1);

        if (isValid) {
            setPreviousWords([newWord, ...previousWords]);
            setValidCount((prev) => prev + 1);
            setError('');
        } else {
            setError(`"${newWord}" is not a valid word`);
        }

        setCurrentInput('');
    };

    const handleStart = () => {
        if (selectedLength) {
            const start = getRandomWord(selectedLength);
            setPreviousWords([start]);
            setGameStarted(true);

            setStartTime(Date.now()); // current timestamp in ms
        }
    };

    const handleBack = () => {
        navigate('/home');
    };

    const handleGameOver = async() => {
        if (gameOver){
            try{
                const response = await fetch(`./backend/public/game/new.php`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        game_mode_id :selectedLength,
                        player_id : userId,
                        start_time : formatToMySQLDatetime(startTime!),
                        end_time : formatToMySQLDatetime(endTime!),
                        date : getCurrentDate(),
                        word_count : validCount
                    })
                });
                const data = await response.json();
                console.log(data);                
                if(response.ok){
                    navigate('/home');
                }
                else{
                    alert(data.error || 'Sign-up failed');
                }
            } catch(error){
                
                console.log(error);
            }
        }
        
    };

    if (gameOver) {
        return (
            <div className="letter-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">Time's Up!</h1>
                <p className="result">✅ Valid Words: {validCount}</p>
                <p className="result">📝 Total Words Entered: {totalCount}</p>
                <button onClick={handleBack} className="submit-btn">Back to Home</button>
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <div className="letter-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">Letter Mode</h1>
                <p className="subtitle">Choose word length:</p>
                <div className="length-options">
                    {[4, 5, 6, 7, 8].map((len) => (
                        <button
                            key={len}
                            onClick={() => setSelectedLength(len)}
                            className={`length-btn ${selectedLength === len ? 'selected' : ''}`}
                        >
                            {len} Letters
                        </button>
                    ))}
                </div>
                <button onClick={handleStart} className="start-btn" disabled={!selectedLength}>
                    Start
                </button>
            </div>
        );
    }

    return (
        <div className="letter-container">
            <button onClick={handleBack} className="back-btn">← Back</button>
            <h1 className="title">CHAIN REACTION</h1>

            <div className="top-row">
                <div className="previous-words">
                    {previousWords.slice(0, 2).map((word, i) => (
                        <div key={i} className={i === 0 ? 'word white' : 'word gray'}>
                            {word}
                        </div>
                    ))}
                </div>
                <div className="timer">:{timer}</div>
            </div>

            <input
                type="text"
                className="word-input"
                placeholder={`Start with "${previousWords[0]?.slice(-1)}"`}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={gameOver}
            />

            <button onClick={handleSubmit} className="submit-btn" disabled={gameOver}>
                submit
            </button>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LetterMode;
