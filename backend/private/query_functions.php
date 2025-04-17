<?php

// ----- GameMode -----

function find_all_game_modes() {
  global $db;
  $sql = "SELECT * FROM GameMode ORDER BY game_mode_id ASC";
  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  return $result;
}

function insert_game_mode($gamemode) {
  global $db;
  $sql = "INSERT INTO GameMode (mode, time_limit) VALUES ('" .
         $gamemode['mode'] . "', '" .
         $gamemode['time_limit'] . "')";
  $result = mysqli_query($db, $sql);
  return $result ? true : die(mysqli_error($db));
}
  
function find_game_mode_by_id($id) {
    global $db;
    $sql = "SELECT * FROM GameMode WHERE game_mode_id='" . $id . "'";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return mysqli_fetch_assoc($result);
}
  
function update_game_mode($gamemode) {
    global $db;
    $sql = "UPDATE GameMode SET ";
    $sql .= "mode='" . $gamemode['mode'] . "', ";
    $sql .= "time_limit='" . $gamemode['time_limit'] . "' ";
    $sql .= "WHERE game_mode_id='" . $gamemode['game_mode_id'] . "' LIMIT 1";

    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}
  
  function delete_game_mode($id) {
    global $db;
    $sql = "DELETE FROM GameMode WHERE game_mode_id='" . $id . "' LIMIT 1";
    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
  }
  

// ----- Player -----

function find_all_players() {
  global $db;
  $sql = "SELECT * FROM Player ORDER BY player_id ASC";
  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  return $result;
}

function insert_player($player) {
  global $db;

  $username = mysqli_real_escape_string($db, $player['username']);
  $email = mysqli_real_escape_string($db, $player['email']);
  $password = mysqli_real_escape_string($db, $player['password']);

  $sql = "INSERT INTO Player (username, email, password)
          VALUES ('$username', '$email', '$password')";

  $result = mysqli_query($db, $sql);

  if (!$result) {
    error_log("MySQL error: " . mysqli_error($db));
    return ['error' => 'Insert failed', 'details' => mysqli_error($db)];
  }

  return mysqli_insert_id($db);
}

function find_player_by_id($id) {
    global $db;
    $sql = "SELECT * FROM Player WHERE player_id='" . $id . "'";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return mysqli_fetch_assoc($result);
}

function update_player($player) {
    global $db;
    $sql = "UPDATE Player SET ";
    $sql .= "username='" . $player['username'] . "', ";
    $sql .= "email='" . $player['email'] . "', ";
    $sql .= "password='" . $player['password'] . "', ";

    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

function delete_player($id) {
    global $db;
    $sql = "DELETE FROM Player WHERE player_id='" . $id . "' LIMIT 1";
    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

function player_signin($email, $username, $password) {
  global $db;
  $sql = "SELECT * FROM Player WHERE email='" . $email . "' AND username='" . $username . "' AND password='" . $password . "'";
  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  return mysqli_fetch_assoc($result);    
}

// ----- Game -----

function insert_game($game) {
  global $db;
  $sql = "INSERT INTO Game (game_mode_id, player_id, start_time, end_time, date, word_count) VALUES ('" .
         $game['game_mode_id'] . "', '" .
         $game['player_id'] . "', '" .
         $game['start_time'] . "', '" .
         $game['end_time'] . "', '" .
         $game['date'] . "', '" .
         $game['word_count'] . "')";
  $result = mysqli_query($db, $sql);
  return $result ? true : die(mysqli_error($db));
}

function find_all_games() {
    global $db;
    $sql = "SELECT * FROM Game ORDER BY game_id ASC";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return $result;
}
  
function find_game_by_id($id) {
    global $db;
    $sql = "SELECT * FROM Game WHERE game_id='" . $id . "'";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return mysqli_fetch_assoc($result);
}
  
function update_game($game) {
    global $db;
    $sql = "UPDATE Game SET ";
    $sql .= "game_mode_id='" . $game['game_mode_id'] . "', ";
    $sql .= "player_id='" . $game['player_id'] . "', ";
    $sql .= "start_time='" . $game['start_time'] . "', ";
    $sql .= "end_time='" . $game['end_time'] . "', ";
    $sql .= "date='" . $game['date'] . "', ";
    $sql .= "word_count='" . $game['word_count'] . "' ";
    $sql .= "WHERE game_id='" . $game['game_id'] . "' LIMIT 1";

    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

function delete_game($id) {
    global $db;
    $sql = "DELETE FROM Game WHERE game_id='" . $id . "' LIMIT 1";
    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

// ----- Daily Scoreboard -----

function find_daily_high_score($game_mode_id) {
  global $db;

  $sql = "SELECT p.username, g.word_count, g.date
          FROM Game g
          JOIN Player p ON g.player_id = p.player_id
          WHERE g.date = CURDATE()
            AND g.game_mode_id = '" . $game_mode_id . "'
          ORDER BY g.word_count DESC";

  $result = mysqli_query($db, $sql);
  confirm_result_set($result);
  return $result;
}

function insert_daily_scoreboard($ds) {
  global $db;
  $sql = "INSERT INTO DailyScoreboard (date, highest_score, player_id, game_mode_id) VALUES ('" .
         $ds['date'] . "', '" .
         $ds['highest_score'] . "', '" .
         $ds['player_id'] . "', '" .
         $ds['game_mode_id'] . "')";
  $result = mysqli_query($db, $sql);
  return $result ? true : die(mysqli_error($db));
}

function find_all_daily_scoreboards() {
    global $db;
    $sql = "SELECT * FROM DailyScoreboard ORDER BY daily_scoreboard_id ASC";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return $result;
}

function find_daily_scoreboard_by_id($id) {
    global $db;
    $sql = "SELECT * FROM DailyScoreboard WHERE daily_scoreboard_id='" . $id . "'";
    $result = mysqli_query($db, $sql);
    confirm_result_set($result);
    return mysqli_fetch_assoc($result);
}

function update_daily_scoreboard($ds) {
    global $db;
    $sql = "UPDATE DailyScoreboard SET ";
    $sql .= "date='" . $ds['date'] . "', ";
    $sql .= "highest_score='" . $ds['highest_score'] . "', ";
    $sql .= "player_id='" . $ds['player_id'] . "', ";
    $sql .= "game_mode_id='" . $ds['game_mode_id'] . "' ";
    $sql .= "WHERE daily_scoreboard_id='" . $ds['daily_scoreboard_id'] . "' LIMIT 1";

    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

function delete_daily_scoreboard($id) {
    global $db;
    $sql = "DELETE FROM DailyScoreboard WHERE daily_scoreboard_id='" . $id . "' LIMIT 1";
    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

  
?>
