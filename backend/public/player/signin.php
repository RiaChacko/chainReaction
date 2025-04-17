#!/usr/local/bin/php
<?php

header('Content-Type: application/json');
require_once('../../private/initialize.php');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = $data['email'] ?? null;
$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

if ($email && $username && $password) {
    // Example: create player or handle logic
    // $result = create_player($email, $username, $password);
    $player = player_signin($email, $username, $password);
    if (!$player) {
        echo json_encode(['error' => 'Invalid email, username, or password']);
        exit;
    }
    $id = $player['player_id'] ?? null;
    echo json_encode([
        'id' => $id
    ]);
} else {
    echo json_encode(['error' => 'Missing email, username, or password']);
}
?>