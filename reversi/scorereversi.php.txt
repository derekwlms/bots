<?php
  require('reversimove.php');
  $urls[0] = 'http://derekwilliams.us/bots/reversi';
  $urls[1] = $urls[0];  // Your bot here
  $pieces = array('X', 'O');
  $board = str_repeat('.',64);
  $board[27]='O'; $board[28]='X';
  $board[35]='X'; $board[36]='O';
  $player = 0;

  for ($i=0; $i<64; $i++) {;
    $play = file_get_contents($urls[$player].'?board='.$board.'&piece='.$pieces[$player]);
    $board = update_board($board, $play);
    show_board($board);
    $player = $player == 0 ? 1 : 0;
  }

  function show_board($board) {
    $scores = array('.' => 0, 'X' => 0, 'O' => 0);
    echo '<table border="1">';
    for ($i=0; $i<8; $i++) {
      echo '<tr border="1">';
      for ($j=0; $j<8; $j++) {
        $piece = $board[($i*8)+$j];
        $scores[$piece]++;
        echo '<td border="1">'.$piece.'&nbsp;</td>';
      }
      echo '</tr>';
    }
    echo '</table><p>&nbsp;</p>';
    printf("<p>X: %d, O: %d</p>", $scores['X'], $scores['O']);
    if ($scores['.'] == 0) 
      exit(printf("<p>%s wins!</p>", $scores['X'] > $scores['O'] ? 'X' : 0));
  }

?>