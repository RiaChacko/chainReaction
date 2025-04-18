#!/usr/local/bin/php
<?php
// backend/public/dailyscoreboard/new.php
// POST create new entry
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $ds = [];
  $ds['date'] = $data['date'] ?? '';
  $ds['highest_score'] = $data['highest_score'] ?? 0;
  $ds['player_id'] = $data['player_id'] ?? '';
  $ds['game_mode_id'] = $data['game_mode_id'] ?? '';

  $result = insert_daily_scoreboard($ds);
  echo $result ? json_encode(['message' => 'Daily scoreboard entry inserted']) : json_encode(['error' => 'Insert failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
