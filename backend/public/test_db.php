#!/usr/local/bin/php

<?php
require_once('../private/initialize.php');

if(isset($db)) {
  echo json_encode(['message' => 'Database connection successful']);
} else {
  echo json_encode(['error' => 'Database connection failed']);
}
?>
