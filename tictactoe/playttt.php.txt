<?php
  $url = 'http://derekwilliams.us/bots/tictactoe';  // Your bot here

  // Set up the session.  If this is a new game, show the initial board:
  session_start();
  if (!isset($_SESSION['board'])) {
    $_SESSION['board'] = '         ';
    exit(show_board($_SESSION['board']));
  }

  // Get the board, add X's (the human's) move, and score it:
  $board = $_SESSION['board'];
  $board[($_REQUEST['row'] * 3) + $_REQUEST['col']] = 'X';
  if (!is_null($result = score_board($board, 'X')))
    game_over($board, $result);

  // Call the web service bot to get it's (O's) move and score it:
  $board = file_get_contents($url.'?board=|'.rawurlencode($board).'|');
  $board = substr($board, 1, 9);
  if (!is_null($result = score_board($board, 'O'))) 
    game_over($board, $result);

  // No-one has won yet.  Show the board & keep playing:
  show_board($board);
  $_SESSION['board'] = $board;


  // Helper functions:

  function score_board($board, $turn) {

    STATIC $wins = array( array(0,1,2), array(3,4,5), array(6,7,8),
                          array(0,3,6), array(1,4,7), array(2,5,8),
                          array(0,4,8), array(2,4,6) );

    for ($i=0; $i<8; $i++) {
      for ($j=0, $piececount=0; $j<3; $j++) {
        if ($board[$wins[$i][$j]] == $turn)
          $piececount++;
      }
      if ($piececount == 3)
        return $turn.' wins!';
      elseif (substr_count($board, ' ') == 0)
        return 'Tie!';
    }
  }

  function show_board($board) {
    STATIC $images = array( 'X' => 'x.jpg', 'O' => 'o.jpg', ' ' => 'space.jpg');
    echo '<table border="1">';
    for ($i=0; $i<3; $i++) {
      echo '<tr border="1">';
      for ($j=0; $j<3; $j++) {
        $piece = $board[($i*3)+$j];
        if ($piece == ' ')
          printf('<td border="1"><a href="playttt.php?row=%d&col=%d"><img src="%s"></td></a>',
                    $i, $j, $images[$piece]);
        else
          printf('<td border="1"><img src="%s"></td>', $images[$piece]);
      }
      echo '</tr>';
    }
    echo '</table><p>&nbsp;</p>';
  }

  function game_over($board, $result) {
    show_board($board);
    unset($_SESSION['board']);
    exit(printf('<p><b>%s</b></p><a href="playttt.php">Start Over</a>', $result));
  }
?>