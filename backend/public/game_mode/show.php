

<?php
// backend/public/gamemode/show.php?id=1
// GET one game mode by ID
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_get_request() && isset($_GET['id'])) {
  $mode = find_game_mode_by_id($_GET['id']);
  echo $mode ? json_encode($mode) : json_encode(['error' => 'Game mode not found']);
} else {
  echo json_encode(['error' => 'GET request with id required']);
}
?>
