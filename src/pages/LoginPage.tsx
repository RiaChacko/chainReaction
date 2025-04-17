import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { Game } from '../types'; 
import { UserContext } from '../UserContext';
  
const LoginPage = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate();
    const { setUserId, setUsername } = useContext(UserContext);

    const handleSignIn = async () => {
        // Placeholder logic
        if (username && password) {
            try {
                const response = await fetch(`./backend/public/player/signin.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password }),
                });
                const data = await response.json();
                console.log(data);
                if(response.ok){
                    navigate('/home');
                }
                setUsername(username);
                setUserId(data['player_id']);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        } else {
            alert('Please enter both username and password');
        }
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
                console.log(data);                
                if(response.ok){
                    navigate('/home');
                }
                else{
                    alert(data.error || 'Sign-up failed');
                }
                setUsername(username);
                setUserId(data['player_id']);

            } catch(error){
                
                console.log(error);
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
                    onChange={(e) => setUser(e.target.value)}
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
