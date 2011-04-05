<?php
  $counts = array("rock" => 0, "paper" => 0, "scissors" => 0);
  $url = 'http://derekwilliams.us/bots/rps';
  for ($i=0; $i<10; $i++)
    $counts[file_get_contents($url)]++;
  print_r($counts);
?>