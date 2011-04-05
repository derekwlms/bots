<?php
  $urls[0] = 'http://derekwilliams.us/bots/tictactoe';
  $urls[1] = $urls[0];  // Your bot here
  $board = '         ';
  $turn = 'X';

  for ($round=0; $round<5; $round++) {
    for ($i=0; $i<2; $i++) {
      $board = file_get_contents($urls[$i].'?board=|'.rawurlencode($board).'|');
      $board = substr($board, 1, 9);
      show_board($board);
      if (!is_null($result = score_board($board, $round, $turn)))
        exit(show_result($result));
      elseif ($round==4)
        exit(show_result('Tie'));
      $turn = $turn == 'X' ? 'O' : 'X';
    }
  }


  function score_board($board, $round, $turn) {

    STATIC $wins = array( array(0,1,2), array(3,4,5), array(6,7,8),
                          array(0,3,6), array(1,4,7), array(2,5,8),
                          array(0,4,8), array(2,4,6) );

    if (substr_count($board, $turn) != $round + 1)
      return 'Wrong number of '.$turn.'s';

    for ($i=0; $i<8; $i++) {
      for ($j=0, $piececount=0; $j<3; $j++) {
        if ($board[$wins[$i][$j]] == $turn)
          $piececount++;
      }
      if ($piececount == 3)
        return $turn.' wins!';
    }
  }

  function show_board($board) {
    echo '<table border="1">';
    for ($i=0; $i<3; $i++) {
      echo '<tr border="1">';
      for ($j=0; $j<3; $j++) 
        echo '<td border="1">'.$board[($i*3)+$j].'&nbsp;</td>';
      echo '</tr>';
    }
    echo '</table><p>&nbsp;</p>';
  }

  function show_result($result) {
    return printf('<p><b>%s</b></p>', $result);
  }
?>