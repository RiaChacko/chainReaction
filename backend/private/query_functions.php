#!/usr/local/bin/php

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
    $sql = "SELECT * FROM GameMode WHERE game_mode_id='" . $id;
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
  $sql = "INSERT INTO Player (avg_words_per_min, playtime, username, email, password, highest_score, daily_streak) VALUES ('" .
         $player['avg_words_per_min'] . "', '" .
         $player['playtime'] . "', '" .
         $player['username'] . "', '" .
         $player['email'] . "', '" .
         $player['password'] . "', '" .
         $player['highest_score'] . "', '" .
         $player['daily_streak'] . "')";
  $result = mysqli_query($db, $sql);
  return $result ? true : die(mysqli_error($db));
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
    $sql .= "avg_words_per_min='" . $player['avg_words_per_min'] . "', ";
    $sql .= "playtime='" . $player['playtime'] . "', ";
    $sql .= "username='" . $player['username'] . "', ";
    $sql .= "email='" . $player['email'] . "', ";
    $sql .= "password='" . $player['password'] . "', ";
    $sql .= "highest_score='" . $player['highest_score'] . "', ";
    $sql .= "daily_streak='" . $player['daily_streak'] . "' ";
    $sql .= "WHERE player_id='" . $player['player_id'] . "' LIMIT 1";

    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
}

function delete_player($id) {
    global $db;
    $sql = "DELETE FROM Player WHERE player_id='" . $id . "' LIMIT 1";
    $result = mysqli_query($db, $sql);
    return $result ? true : die(mysqli_error($db));
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
