// GameMode
export type GameMode = {
    game_mode_id: number;
    mode_name: 'Peaceful' | 'Normal' | '4 letter' | '5 letter' | '6 letter' | '7 letter' | '8 letter';
    time_limit: number;
  };
  
// Game
export type Game = {
  game_id: number;
  player_id: number;
  game_mode_id: number;
  start_time: string; // ISO datetime string
  end_time: string;   // ISO datetime string
  score: number; 
  date: string; // YYYY-MM-DD
};

// DailyScoreboard
export type DailyScoreboard = {
  daily_scoreboard_id: number;
  date: string; // YYYY-MM-DD
  highest_score: number;
  player_id: number;
  game_mode_id: number;
};

// Scoreboard Entry
export type ScoreboardEntry = {
  username: string;
  score: number;
  date: string; // YYYY-MM-DD
};

// Player
export type Player = {
  player_id: number;
  username: string;
  email: string;
  password: string;
  highest_score: number;
  average_words_per_minute: number;
  daily_streak: number;
};
  