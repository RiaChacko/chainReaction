import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

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
              const response = await fetch(`./backend/public/gamemode/show.php?id=1`);
              const data = await response.json();
              if (!response.ok) throw new Error(data.error || 'Failed to fetch game mode');
              setGm(data);
            } catch (error) {
              console.error('Error: ', error);
            }
          };
      
          fetchGm();
        }, []);
      
        return <h2>{gm ? JSON.stringify(gm) : 'Loading...'}</h2>;
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
