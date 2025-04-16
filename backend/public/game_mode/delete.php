#!/usr/local/bin/php

<?php
// backend/public/gamemode/delete.php
// POST delete game mode
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['game_mode_id'] ?? '';

  $result = delete_game_mode($id);
  echo $result ? json_encode(['message' => 'Game mode deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
