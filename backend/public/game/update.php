#!/usr/local/bin/php

<?php
// backend/public/game/update.php
// POST update game
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);

  $game = [];
  $game['game_id'] = $data['game_id'] ?? '';
  $game['game_mode_id'] = $data['game_mode_id'] ?? '';
  $game['player_id'] = $data['player_id'] ?? '';
  $game['start_time'] = $data['start_time'] ?? '';
  $game['end_time'] = $data['end_time'] ?? '';
  $game['date'] = $data['date'] ?? '';
  $game['word_count'] = $data['word_count'] ?? 0;

  $result = update_game($game);
  echo $result ? json_encode(['message' => 'Game updated']) : json_encode(['error' => 'Update failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
