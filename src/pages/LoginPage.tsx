import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { Game } from '../types'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate();

    const handleSignIn = async () => {
        // Placeholder logic
        if (username && password) {
            try {
                const response = await fetch(`./backend/public/player/show.php`, {
                    method: 'GET',
                });
                const data = await response.json();
                const player = data.find((player: { username: string; }) => player.username === username);
    
                if (player && await verifyPassword(password, player.password)) {
                    localStorage.setItem('playerId', player.player_id);
                    navigate('/home');
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        } else {
            alert('Please enter both username and password');
        }
    };

    const verifyPassword = async (inputPassword: string, storedPassword: any) => {
     
        return inputPassword === storedPassword;
    };
    const handleSignUp = async () => {
        // Placeholder logic
        if (username && password && email) {
            try{
                const response = await fetch(`./backend/public/player/new.php`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        username:username,
                        email:email,
                        password:password,
                        avg_words_per_min: 0,
                        playtime:0,
                        highest_score:0,
                        daily_streak:0,
                    }),
                });
                const data = await response.json();
                if(response.ok){
                    navigate('/home');
                }
                else{
                    alert(data.error || 'Sign-up failed');
                }
            } catch(error){
                
                alert('An error occurred. Please try again later.');
            }
            
            
        } else{
            alert('Please fill in all the fields.');
        }
    };

    const handleGuest = () => {
        navigate('/home');
    };

    const GameMode = () => {
        const [gm, setGm] = useState<Game | null>(null);
      
        useEffect(() => {
          const fetchGm = async () => {
            try {
              const response = await fetch(`./backend/public/game/show.php?id=1`);
              const data = await response.json();
              if (!response.ok) throw new Error(data.error || 'Failed to fetch game mode');
              setGm(data);
            } catch (error) {
              console.error('Error: ', error);
            }
          };
      
          fetchGm();
        }, []);
      
        return <h2>{gm ? gm.score : 'Loading...'}</h2>;
      };

    return (
        <div className="login-container">
            <h1 className="login-title">CHAIN REACTION</h1>
            <GameMode />
            <div className="login-box">
            <input
                    type="text"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="login-buttons">
                    <button onClick={handleSignIn} className="login-btn">Sign In</button>
                    <button onClick={handleSignUp} className="login-btn">Sign Up</button>
                    <button onClick={handleGuest} className="login-btn guest">Play as Guest</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
