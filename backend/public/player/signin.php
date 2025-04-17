#!/usr/local/bin/php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
require_once('../../private/initialize.php');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;
$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

if ($email && $username && $password) {
    // Example: create player or handle logic
    // $result = create_player($email, $username, $password);
    $player = player_signin($email, $username, $password);
    // if (!$player) {
    //     echo json_encode(['error' => 'Invalid email, username, or password']);
    //     exit;
    // }
    $id = $player['player_id'] ?? null;
    echo json_encode([
        'id' => $id
    ]);
} else {
    echo json_encode(['error' => 'Missing email, username, or password']);
}
?>