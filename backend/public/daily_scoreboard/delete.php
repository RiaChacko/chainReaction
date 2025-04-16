#!/usr/local/bin/php
<?php
// backend/public/dailyscoreboard/delete.php
// POST delete entry
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['daily_scoreboard_id'] ?? '';

  $result = delete_daily_scoreboard($id);
  echo $result ? json_encode(['message' => 'Entry deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
