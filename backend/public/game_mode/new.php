#!/usr/local/bin/php

<?php
// backend/public/gamemode/new.php
// POST create new game mode
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $gamemode = [];
  $gamemode['mode'] = $data['mode'] ?? '';
  $gamemode['time_limit'] = $data['time_limit'] ?? 0;

  $result = insert_game_mode($gamemode);
  echo $result ? json_encode(['message' => 'Game mode inserted']) : json_encode(['error' => 'Insert failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
