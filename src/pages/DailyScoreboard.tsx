import React, { useState, useEffect } from 'react';
import './DailyScoreboard.css';
import { useNavigate } from 'react-router-dom';
import { ScoreboardEntry } from '../types'; // Adjust the import path as necessary

const GameModes = {
    1: "Peaceful",
    2: "Normal",
    3: "4 Letter",
    4: "5 Letter",
    5: "6 Letter",
    6: "7 Letter",
    7: "8 Letter",
  };

const DailyScoreboard = () => {
    const navigate = useNavigate();
    const [gameMode, setGameMode] = useState(1);
    const [entries, setEntries] = useState<ScoreboardEntry[]>([]);

    
    useEffect(() => { 
        const fetchData = async () => {
            try {
                const response = await fetch(`./backend/public/daily_scoreboard/show.php?id=${gameMode}`);
                const data = await response.json();
                console.log(data);
                setEntries(data);
            } catch (err) {
                console.error("Failed to load scoreboard:", err);
            }
        };

        fetchData(); 
    }, [gameMode]);

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="letter-container">
            <button onClick={handleBack} className="back-btn">← Back</button>
            <h1 className="title">Daily Scoreboard</h1>
            {Object.entries(GameModes).map(([modeId, modeName]) => (
                <button
                    key={modeId}
                    onClick={() => setGameMode(Number(modeId))}
                    style={{ fontWeight: gameMode === Number(modeId) ? 'bold' : 'normal' }}
                >
                    {modeName}
                </button>
            ))}

            <div className="scoreboard">
                <table>
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.score}</td>
                        <td>{item.date}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyScoreboard;