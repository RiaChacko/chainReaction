#!/usr/local/bin/php
<?php

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
?>