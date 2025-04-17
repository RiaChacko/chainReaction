#!/usr/local/bin/php
<?php
// backend/public/player/new.php
// get all players
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $player = [];
  $player['average_words_per_minute'] = $data['average_words_per_minute'] ?? 0;
  $player['username'] = $data['username'] ?? '';
  $player['email'] = $data['email'] ?? '';
  $player['password'] = $data['password'] ?? '';
  $player['highest_score'] = $data['highest_score'] ?? 0;
  $player['daily_streak'] = $data['daily_streak'] ?? 0;

  $id = insert_player($player);
  if (is_array($id)) {
    echo json_encode($id); 
  } else {
    echo json_encode(['id' => $id]);
  }

} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
