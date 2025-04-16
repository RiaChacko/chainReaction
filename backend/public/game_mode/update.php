#!/usr/local/bin/php

<?php
// backend/public/gamemode/update.php
// POST update game mode
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);

  $gamemode = [];
  $gamemode['game_mode_id'] = $data['game_mode_id'] ?? '';
  $gamemode['mode'] = $data['mode'] ?? '';
  $gamemode['time_limit'] = $data['time_limit'] ?? 0;

  $result = update_game_mode($gamemode);
  echo $result ? json_encode(['message' => 'Game mode updated']) : json_encode(['error' => 'Update failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
