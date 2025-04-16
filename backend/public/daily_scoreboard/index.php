#!/usr/local/bin/php

<?php
// backend/public/dailyscoreboard/index.php
// GET all daily scoreboard entries
require_once('../../private/initialize.php');

if(is_get_request()) {
  $result = find_all_daily_scoreboards();
  $entries = [];

  while($entry = mysqli_fetch_assoc($result)) {
    $entries[] = $entry;
  }

  echo json_encode($entries);
  mysqli_free_result($result);
} else {
  echo json_encode(['error' => 'GET request required']);
}
?>
