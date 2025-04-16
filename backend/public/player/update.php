#!/usr/local/bin/php

<?php
// backend/public/player/update.php
// POST update player
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);

  $player = [];
  $player['player_id'] = $data['player_id'] ?? '';
  $player['avg_words_per_min'] = $data['avg_words_per_min'] ?? 0;
  $player['playtime'] = $data['playtime'] ?? 0;
  $player['username'] = $data['username'] ?? '';
  $player['email'] = $data['email'] ?? '';
  $player['password'] = $data['password'] ?? '';
  $player['highest_score'] = $data['highest_score'] ?? 0;
  $player['daily_streak'] = $data['daily_streak'] ?? 0;

  $result = update_player($player);
  echo $result ? json_encode(['message' => 'Player updated']) : json_encode(['error' => 'Update failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
