<?php require_once('../../private/initialize.php'); ?>

<?php
$id = $_GET['id'] ?? '1';
$mode = find_game_mode_by_id($id);
?>

<?php $page_title = 'Show Game Mode'; ?>
<?php include(SHARED_PATH . '/staff_header.php'); ?>

<div id="content">

  <a class="back-link" href="<?php echo url_for('/staff/gamemodes/index.php'); ?>">&laquo; Back to List</a>

  <div class="gamemode show">
    <?php if($mode): ?>
      <p>Game Mode ID: <?php echo h($mode['game_mode_id']); ?></p>
      <p>Mode Name: <?php echo h($mode['mode_name']); ?></p>
      <p>Time Limit: <?php echo h($mode['time_limit']); ?> seconds</p>
    <?php else: ?>
      <p>Game mode not found.</p>
    <?php endif; ?>
  </div>

</div>
