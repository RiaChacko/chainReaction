#!/usr/local/bin/php
<?php

echo "SAPI: " . php_sapi_name() . "\n";

file_put_contents('/tmp/debug.log', 'SAPI: ' . php_sapi_name() . "\n" . 'ARGV: ' . print_r($argv, true) . "\nGET: " . print_r($_GET, true));

require_once('../../private/initialize.php');

if(php_sapi_name() === 'cli') {
  // CLI mode: parse ID from $argv
  $id = $argv[1] ?? null;
} else {
  // Web mode: parse ID from $_GET
  $id = $_GET['id'] ?? null;
  header('Content-Type: application/json');
}

if($id) {
  $mode = find_game_mode_by_id($id);
  echo json_encode($mode ?: ['error' => 'Game mode not found']);
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
