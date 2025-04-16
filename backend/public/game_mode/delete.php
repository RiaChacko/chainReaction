#!/usr/local/bin/php

<?php
// backend/public/gamemode/delete.php
// POST delete game mode
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['game_mode_id'] ?? '';

  $result = delete_game_mode($id);
  echo $result ? json_encode(['message' => 'Game mode deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
