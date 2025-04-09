<?php
// backend/public/game/index.php
// GET all games
require_once('../../private/initialize.php');

if(is_get_request()) {
  $result = find_all_games();
  $games = [];

  while($game = mysqli_fetch_assoc($result)) {
    $games[] = $game;
  }

  echo json_encode($games);
  mysqli_free_result($result);
} else {
  echo json_encode(['error' => 'GET request required']);
}
?>
