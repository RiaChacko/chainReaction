#!/usr/local/bin/php

<?php
// backend/public/game/index.php
// GET all games
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
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
