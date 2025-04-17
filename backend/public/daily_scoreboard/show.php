#!/usr/local/bin/php
<?php

header('Content-Type: application/json');
require_once('../../private/initialize.php');

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
  $result = find_daily_high_score($id);

  if (!$result) {
    echo json_encode(['error' => 'Query failed']);
    exit;
  }

  $entries = [];
  while ($entry = mysqli_fetch_assoc($result)) {
    $entries[] = $entry;
  }

  mysqli_free_result($result);

  echo json_encode(!empty($entries) ? $entries : ['error' => 'No entries found']);
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
