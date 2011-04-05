<?php
  require('reversimove.php');
  $url = 'http://derekwilliams.us/bots/reversi/';  // Your bot here

  // Set up the session.  If this is a new game, show the initial board:
  session_start();
  if (!isset($_SESSION['board']) || !isset($_REQUEST['row'])) {
    $board = str_repeat('.',64);
    $board[27]='O'; $board[28]='X';
    $board[35]='X'; $board[36]='O';
    $_SESSION['board'] = $board;
    exit(show_board($board));
  }

  // Get the board, add Xs (the human's) move, and score it:
  $play = $board = $_SESSION['board'];
  $play[($_REQUEST['row'] * 8) + $_REQUEST['col']] = 'X';
  $board = update_board($board, $play);
  if (substr_count($board, '.') == 0) {
    unset($_SESSION['board']);
    exit(show_board($board));
  }

  // Call the web service bot to get its (O's) move and score it:
  $play = file_get_contents($url.'?board='.$board.'&piece=O');
  $board = update_board($board, $play);
  show_board($board);

  $_SESSION['board'] = $board;

  function show_board($board) {
    STATIC $images = array( 'X' => 'black.jpg', 'O' => 'white.jpg', '.' => 'green.jpg');
    $scores = array('.' => 0, 'X' => 0, 'O' => 0);
    echo '<table border="1">';
    for ($i=0; $i<8; $i++) {
      echo '<tr border="1">';
      for ($j=0; $j<8; $j++) {
        $piece = $board[($i*8)+$j];
        $scores[$piece]++;
        if ($piece == '.' && can_play($board, 'X', ($i*8)+$j))
          printf('<td border="1"><a href="playreversi.php?row=%d&col=%d"><img src="%s"></td></a>',
                    $i, $j, $images[$piece]);
        else
          printf('<td border="1"><img src="%s"></td>', $images[$piece]);
      }
      echo '</tr>';
    }
    printf('</table><p>X: %d, O: %d.&nbsp;<a href="playreversi.php">Start Over</a></p>',
            $scores['X'], $scores['O']);
  }
?>