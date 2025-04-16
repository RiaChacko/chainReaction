<?php
// backend/public/game/show.php?id=1
// GET one game by ID
require_once('../../private/initialize.php');

if(is_get_request() && isset($_GET['id'])) {
  $game = find_game_by_id($_GET['id']);
  echo $game ? json_encode($game) : json_encode(['error' => 'Game not found']);
} else {
  echo json_encode(['error' => 'GET request with id required']);
}
?>
