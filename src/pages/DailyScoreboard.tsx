import React, { useState, useEffect } from 'react';
import './DailyScoreboard.css';
import { useNavigate } from 'react-router-dom';

const DailyScoreboard = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([{ date: "", score: 0 }]);

    const loadScoreboard = async () => {
        try {
            const response = await fetch("./backend/public/daily_scoreboard/index.php");
            const data = await response.json();
            console.log(data);
            setEntries(data); // Now using setEntries to update the state with fetched data
        } catch (error) {
            console.error("Error getting scoreboard", error);
        }
    }

    useEffect(() => {
        loadScoreboard();
    }, []);

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="letter-container">
            <button onClick={handleBack} className="back-btn">← Back</button>
            <h1 className="title">Daily Scoreboard</h1>
            <ol>
                {entries && entries.map((entry) => (
                    <li key={entry.score}>{entry.date} {entry.score}</li>
                ))}
            </ol>
        </div>
    );
};

export default DailyScoreboard;
