#!/usr/local/bin/php

<?php
// backend/public/player/new.php
// get all players
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $player = [];
  $player['avg_words_per_min'] = $data['avg_words_per_min'] ?? 0;
  $player['playtime'] = $data['playtime'] ?? 0;
  $player['username'] = $data['username'] ?? '';
  $player['email'] = $data['email'] ?? '';
  $player['password'] = $data['password'] ?? '';
  $player['highest_score'] = $data['highest_score'] ?? 0;
  $player['daily_streak'] = $data['daily_streak'] ?? 0;

  $result = insert_player($player);
  if($result) {
    echo json_encode(['message' => 'Player inserted']);
  }
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
