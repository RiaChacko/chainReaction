#!/usr/local/bin/php

<?php
// backend/public/game/delete.php
// POST delete game
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);
  $game_id = $data['game_id'] ?? '';

  $result = delete_game($game_id);
  echo $result ? json_encode(['message' => 'Game deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
