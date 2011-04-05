<?php
  $winners = array("rock" => "paper", "paper" => "scissors", "scissors" => "rock");
  $url1 = 'http://derekwilliams.us/bots/rps';
  $url2 = 'http://ninjatricks.net/rps.php';
  $result1 = file_get_contents($url1);
  $result2 = file_get_contents($url2);
  printf("1: %s   2: %s\n", $result1, $result2);
  if ($result1 == $result2)
    echo "Tie";
  elseif ($result1 == $winners[$result2])
    echo "#1 wins!";
  elseif ($result2 == $winners[$result1])
    echo "#2 wins!";
  else
    echo "No winner.  Someone's misbehaving.";
?>