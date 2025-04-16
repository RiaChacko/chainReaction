#!/usr/local/bin/php
<?php

header('Content-Type: application/json');
require_once('../../private/initialize.php');

$id = $_GET['id'] ?? null;

if ($id) {
  $mode = find_player_by_id($id);
  echo json_encode($mode ?: ['error' => 'Game mode not found']);
} else {
  echo json_encode(['error' => 'ID is required']);
}
?>
