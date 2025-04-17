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
  
  echo json_encode($entries ?: ['error' => 'Game mode not found']);
  mysqli_free_result($result);
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
