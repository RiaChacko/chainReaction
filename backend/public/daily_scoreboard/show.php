#!/usr/local/bin/php
<?php

header('Content-Type: application/json');
require_once('../../private/initialize.php');

$id = $_GET['id'] ?? null;

if ($id) {
  $result = find_daily_high_score($id);
  $entries = [];

  while ($entry = mysqli_fetch_assoc($result)) {
    $entries[] = $entry;
  }

  mysqli_free_result($result);

  if (empty($entries)) {
    echo json_encode(['error' => 'No entries found']);
  } else {
    echo json_encode($entries);
  }
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
