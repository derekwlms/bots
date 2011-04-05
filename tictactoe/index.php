<?php

  if (!ereg('^\|{1}[XO ]{9}\|{1}$', $board=$_REQUEST['board']))
   die('|XXXXXXXXX|');
  $board = substr($board, 1, 9);
  $mypiece = (substr_count($board, ' ') & 1) ? 'X' : 'O';

  // The best move is with two plays and one space to win or block.
  // The rest is not much better than random.
  for ($plays=2; $plays>=0; $plays--)
    for ($spaces=1; $spaces<4-$plays; $spaces++)
      if (!is_null($result = find_move($board, $mypiece, $spaces, $plays)))
        exit('|'.$result.'|');

  die('|OOOOOOOOO|');


  function find_move($board, $piece, $spaces, $plays) {

    $wins = array( array(0,1,2), array(3,4,5), array(6,7,8),
                   array(0,3,6), array(1,4,7), array(2,5,8),
                   array(0,4,8), array(2,4,6) );

    for ($i=0; $i<8; $i++) {
      $win=$wins[$i];
      for ($j=0, $mycount=0, $spacecount=0; $j<3; $j++) {
        if ($board[$win[$j]] == $piece)
           $mycount++;
        elseif ($board[$win[$j]] == ' ') {
           $spacecount++;
           $spaceplace = $j;
        }
      }
      $opponentcount = 3 - $mycount - $spacecount;

      if ($spacecount == $spaces) {
        if ($mycount == $plays) {              // win
          $board[$win[$spaceplace]] = $piece;
          return $board;
        } elseif ($opponentcount == $plays) {  // block
          $board[$win[$spaceplace]] = $piece;
          return $board;
        }
      }
    }
    return null;
  }

?>