#!/usr/local/bin/php

<?php
$fp = fsockopen("thunder.cise.ufl.edu", 3306, $errno, $errstr, 5);
if (!$fp) {
  echo "Port 3306 blocked or unreachable: $errstr ($errno)";
} else {
  echo "Port 3306 is open and reachable from PHP.";
  fclose($fp);
}
?>
