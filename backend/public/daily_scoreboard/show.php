#!/usr/local/bin/php
<?php
// backend/public/dailyscoreboard/show.php?id=1
// GET one entry by ID
require_once('../../private/initialize.php');

if(is_get_request() && isset($_GET['id'])) {
  $entry = find_daily_scoreboard_by_id($_GET['id']);
  echo $entry ? json_encode($entry) : json_encode(['error' => 'Entry not found']);
} else {
  echo json_encode(['error' => 'GET request with id required']);
}
?>
