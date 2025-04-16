#!/usr/local/bin/php
<?php
require_once('../private/initialize.php');
$mode = find_game_mode_by_id(1); // Example ID, replace with actual ID as needed
if($mode) {
  echo "\n" . json_encode($mode) . "\n";
} else {
  echo json_encode(['error' => 'Game mode not found']);
}
if(isset($db)) {
  echo json_encode(['message' => 'Database connection successful']);
} else {
  echo json_encode(['error' => 'Database connection failed']);
}
?>
