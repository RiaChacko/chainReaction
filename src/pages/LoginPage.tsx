import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import ts from 'typescript';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Placeholder logic
        if (username && password) {
            navigate('/home');
        }
    };

    const handleSignUp = () => {
        // Placeholder logic
        if (username && password) {
            navigate('/home');
        }
    };

    const handleGuest = () => {
        navigate('/home');
    };

    const GameMode = () => {
        const [gm, setGm] = useState(null);
      
        useEffect(() => {
          const fetchGm = async () => {
            try {
              const response = await fetch(`./backend/public/game_mode/show.php?id=1`);
              const t = await response.text()
              console.log(t)
              const data = await response.json();
              console.log(data)
              if (!response.ok) throw new Error(data.error || 'Failed to fetch game mode');
              setGm(data);
            } catch (error) {
              console.error('Error: ', error);
            }
          };
      
          fetchGm();
        }, []);
      
        // @ts-ignore // TypeScript error: Property 'mode_name' does not exist on type 'null'
        return <h2>{gm ? gm.mode_name : 'Loading...'}</h2>;
      };

    return (
        <div className="login-container">
            <h1 className="login-title">CHAIN REACTION</h1>
            <GameMode />
            <div className="login-box">
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
