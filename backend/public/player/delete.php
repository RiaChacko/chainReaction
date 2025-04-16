#!/usr/local/bin/php

<?php
// backend/public/player/delete.php
// POST delete player
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $player_id = $data['player_id'] ?? '';

  $result = delete_player($player_id);
  echo $result ? json_encode(['message' => 'Player deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
