<?php
// backend/public/player/delete.php
// POST delete player
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);
  $player_id = $data['player_id'] ?? '';

  $result = delete_player($player_id);
  echo $result ? json_encode(['message' => 'Player deleted']) : json_encode(['error' => 'Delete failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
