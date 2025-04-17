import React, { useState, useEffect } from 'react';
import './PeacefulMode.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const WORD_LIST = ['eagle', 'train', 'sand', 'loop', 'river', 'moon', 'fruit', 'flame', 'dodge', 'dream'];

const getRandomWord = () => {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

const formatToMySQLDatetime = (timestamp: number) => {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};

const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

const PeacefulMode = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timer, setTimer] = useState(20);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [previousWords, setPreviousWords] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [startWord, setStartWord] = useState('');

    const [validCount, setValidCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { userId } = useContext(UserContext);

    // Set the starting word only once
    useEffect(() => {
        const word = getRandomWord();
        setStartWord(word);
        setPreviousWords([word]);
    }, []);

    // Timer logic (only when game starts)
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        if (timer === 0) {
            setGameOver(true);
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
        setGameStarted(true);
        setStartTime(Date.now()); // current timestamp in ms
    };

    const handleBack = () => {
        navigate('/home');
    };

    useEffect(() => {
        if (gameOver) {
          (async () => {
            try {
              const response = await fetch(`./backend/public/game/new.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  game_mode_id: 1,
                  player_id: userId,
                  start_time: formatToMySQLDatetime(startTime!),
                  end_time: formatToMySQLDatetime(Date.now()),
                  date: getCurrentDate(),
                  score: validCount,
                })
              });
              const data = await response.json();
              console.log(data);
            } catch (err) {
              console.error(err);
            }
          })();
        }
      }, [gameOver]);
      

    // Result screen
    if (gameOver) {
        return (
            <div className="peaceful-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">Time's Up!</h1>
                <p className="result">✅ Valid Words: {validCount}</p>
                <p className="result">📝 Total Words Entered: {totalCount}</p>
                <button onClick={handleBack} className="submit-btn">Back to Home</button>
            </div>
        );
    }

    // Waiting to start
    if (!gameStarted) {
        return (
            <div className="peaceful-container">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <h1 className="title">CHAIN REACTION</h1>
                <p className="start-word-text">Starting Word: <strong>{startWord}</strong></p>
                <button onClick={handleStart} className="start-btn">Start</button>

            </div>
        );
    }

    // Active game screen
    return (
        <div className="peaceful-container">
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

            <button onClick={handleBack} className="back-btn">← Back</button>
        </div>
    );
};

export default PeacefulMode;
