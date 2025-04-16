#!/usr/local/bin/php

<?php
// backend/public/player/show.php?id=1
// get one player by id
header('Content-Type: application/json');
require_once('../../private/initialize.php');

if(is_get_request()) {
  $result = find_all_players();
  $players = [];

  while($player = mysqli_fetch_assoc($result)) {
    $players[] = $player;
  }

  echo json_encode($players);
  mysqli_free_result($result);
} else {
  echo json_encode(['error' => 'GET request required']);
}
?>
