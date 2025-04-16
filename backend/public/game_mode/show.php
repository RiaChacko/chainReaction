#!/usr/local/bin/php
<?php

// Start clean output buffer
while (ob_get_level()) {
  ob_end_clean();
}
ob_start();

require_once('../../private/initialize.php');

if (php_sapi_name() === 'cli') {
  $id = $argv[1] ?? null;
} else {
  $id = $_GET['id'] ?? null;
  header('Content-Type: application/json');
}

if ($id) {
  $mode = find_game_mode_by_id($id);
  echo json_encode($mode ?: ['error' => 'Game mode not found']);
} else {
  echo json_encode(['error' => 'ID is required']);
}

// End and flush output
ob_end_flush();
?>
