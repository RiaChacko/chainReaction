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
                try{
                    const response = await fetch(`./backend/public/game/new.php`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            game_mode_id: 1,                  // existing game_mode_id
                            player_id: 1,                     // existing player_id
                            start_time: "2025-04-17 10:00:00", // must be valid DATETIME
                            end_time: "2025-04-17 10:10:00",   // must be valid DATETIME
                            date: "2025-04-17",               // must be valid DATE
                            score: 1000
                          })                          
                    });
                    const data = await response.json();
                    console.log(data);                
        
                } catch(error){
                    
                    console.log(error);
                }
            }}>Scoreboard</button>
            
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
