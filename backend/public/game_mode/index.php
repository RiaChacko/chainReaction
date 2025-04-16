#!/usr/local/bin/php
<?php
// backend/public/game_mode/index.php
// GET all game modes

error_reporting(E_ALL);
ini_set('display_errors', 1);


header('Content-Type: application/json');
require_once('../../private/initialize.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
