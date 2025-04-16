#!/usr/local/bin/php
<?php
// backend/public/gamemode/index.php
// GET all game modes

header('Content-Type: application/json');
require_once('../../private/initialize.php');

if (is_get_request()) {
  $result = find_all_game_modes();
  $modes = [];

  while ($mode = mysqli_fetch_assoc($result)) {
    $modes[] = $mode;
  }

  echo json_encode($modes);
  mysqli_free_result($result);
} else {
  echo json_encode(['error' => 'GET request required']);
}
?>
