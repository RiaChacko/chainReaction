#!/usr/local/bin/php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
  echo json_encode($entries); // always returns an array
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
