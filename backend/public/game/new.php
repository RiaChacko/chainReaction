#!/usr/local/bin/php

<?php
// backend/public/game/new.php
// POST create new game
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $game = [];
  $game['game_mode_id'] = $data['game_mode_id'] ?? '';
  $game['player_id'] = $data['player_id'] ?? '';
  $game['start_time'] = $data['start_time'] ?? '';
  $game['end_time'] = $data['end_time'] ?? '';
  $game['date'] = $data['date'] ?? '';
  $game['score'] = $data['score'] ?? 0;

  $result = insert_game($game);
  echo $result ? json_encode(['message' => 'Game inserted']) : json_encode(['error' => 'Insert failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
