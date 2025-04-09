<?php
// backend/public/dailyscoreboard/update.php
// POST update entry
require_once('../../private/initialize.php');

if(is_post_request()) {
  $data = json_decode(file_get_contents("php://input"), true);

  $ds = [];
  $ds['daily_scoreboard_id'] = $data['daily_scoreboard_id'] ?? '';
  $ds['date'] = $data['date'] ?? '';
  $ds['highest_score'] = $data['highest_score'] ?? 0;
  $ds['player_id'] = $data['player_id'] ?? '';
  $ds['game_mode_id'] = $data['game_mode_id'] ?? '';

  $result = update_daily_scoreboard($ds);
  echo $result ? json_encode(['message' => 'Entry updated']) : json_encode(['error' => 'Update failed']);
} else {
  echo json_encode(['error' => 'POST request required']);
}
?>
