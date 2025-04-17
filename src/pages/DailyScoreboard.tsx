import React, { useState, useEffect } from 'react';
import './DailyScoreboard.css';
import { useNavigate } from 'react-router-dom';



const DailyScoreboard = () => {
    const navigate = useNavigate();
    //const entries = loadScoreboard();
    const [entries, setEntries] = useState([{daily_scoreboard_id:"",date:"",highest_score:0,player_id:""}]);
    const loadScoreboard = async () => {
        try{
        const response = await fetch("./backend/public/daily_scoreboard/index.php");
        const data = await response.json();
        
        setEntries(data);}
                  catch(error){console.error("Error getting scoreboard", error)}
        
        //setEntries(entries.filter((entry)=>(entry.date==("04-16-2025"))));
        //setEntries(entries.sort((a,b)=>(a.score-b.score)));
                  
    }
    
    useEffect(()=>{
        loadScoreboard();
        
    //setEntries(todayEntries);
    },[]);
    const handleBack = () => {
        navigate('/home');
    };
    
        

    return (
        <div className="letter-container">
            <button onClick={handleBack} className="back-btn">← Back</button>
            <h1 className="title">Daily Scoreboard</h1>
            <ol>
            {entries&&entries.map((entry)=>(
                <li key={entry.daily_scoreboard_id}>{entry.date} {entry.highest_score} {entry.player_id}</li>
            ))}
            </ol>
            

        </div>
    );
};

export default DailyScoreboard;