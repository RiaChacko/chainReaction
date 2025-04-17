import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // We'll create this next
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { username } = useContext(UserContext);

    const handleScoreboardSelect = () => {
        navigate('/scoreboard');
    }

    const handleModeSelect = (mode: string) => {
        navigate(`/game?mode=${mode.toLowerCase()}`);
    };

    return (
        <div className="homepage-container">
            <h1 className="title">CHAIN REACTION</h1>
            <h2 className="subtitle">Welcome, {username}</h2>

            <button onClick={() => handleScoreboardSelect()}>Scoreboard</button>

            <button onClick={async () => {
  try {
    for (let game_mode_id = 1; game_mode_id <= 7; game_mode_id++) {
      const response = await fetch(`./backend/public/game/new.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_mode_id: game_mode_id,
          player_id: 1, // Make sure this player exists
          start_time: "2025-04-17 10:00:00",
          end_time: "2025-04-17 10:10:00",
          date: "2025-04-17",
          score: 1000 + game_mode_id // to differentiate
        })
      });

      const data = await response.json();
      console.log(`Inserted for mode ${game_mode_id}:`, data);
    }
  } catch (error) {
    console.log("Insert error:", error);
  }
}}
>make games</button>
            
            <h2 className="subtitle">Choose Mode</h2>
            <div className="mode-buttons">
                <button onClick={() => handleModeSelect('Peaceful')}>Peaceful</button>
                <button onClick={() => handleModeSelect('Letter')}>Letter</button>
                <button onClick={() => handleModeSelect('Categories')}>Categories</button>
            </div>
        </div>
    );
};

export default HomePage;
