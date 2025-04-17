import React, { useState, useEffect } from 'react';
import './DailyScoreboard.css';
import { useNavigate } from 'react-router-dom';



const DailyScoreboard = () => {
    const navigate = useNavigate();
    //const entries = loadScoreboard();
    //const currentDate = new Date();
    //const year = currentDate.getFullYear();
    //const month = currentDate.getMonth() + 1; // Month is 0-indexed, so add 1
    //const day = currentDate.getDate();
    const [entries, setEntries] = useState([{daily_scoreboard_id:"",date:"",highest_score:0,player_id:"",game_mode_id:""}]);
    //const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const loadScoreboard = async () => {
        try{
        const response = await fetch("./backend/public/daily_scoreboard/show.php?id=#"); // change # with whatever the game_mode id is
        const data = await response.json();
        
        setEntries(data);}
                  catch(error){console.error("Error getting scoreboard", error)}
        
        //setEntries(entries.filter((entry)=>(entry.game_mode_id===("1"))));
        //setEntries(entries.sort((a,b)=>(a.highest_score-b.highest_score)));
                  
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
            <select>
                <option value="1">Peaceful</option>
                <option value="2">Categories</option>
                <option value="4">4 letter</option>
                <option value="5">5 letter</option>
                <option value="6">6 letter</option>
                <option value="7">7 letter</option>
                <option value="8">8 letter</option>
            </select>
            <ol>
            {entries&&entries.map((entry)=>(
                <li key={entry.daily_scoreboard_id}>{entry.date} {entry.highest_score} {entry.player_id}</li>
            ))}
            </ol>
            

        </div>
    );
};

export default DailyScoreboard;