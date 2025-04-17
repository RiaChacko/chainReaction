import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameScreen from './pages/GameScreen';
import LoginPage from './pages/LoginPage';
import DailyScoreboard from './pages/DailyScoreboard';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router basename="/~menghuahuang/chain_reaction">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/scoreboard" element={<DailyScoreboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
