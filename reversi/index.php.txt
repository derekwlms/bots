<?php
  require('reversimove.php');
  
  if (!ereg('^[XO.]{64}$', $board=$_REQUEST['board']))
   die(str_repeat('X',64));
  if (!ereg('^[XO]$', $mypiece=$_REQUEST['piece']))
   die(str_repeat('.',64));

  if (!is_null($result = find_move($board, $mypiece)))
    exit($result);
  else
    exit($board);

  function find_move($board, $piece) {

    STATIC $plays = array( 0, 7, 56, 63,                  // outer corners
                           2, 5, 16, 23, 40, 47, 58, 61,  // A-squares
                           3, 4, 24, 32, 31, 39, 59, 60,  // B-squares
                          18, 21, 42, 45,                 // inner corners
                          19, 20, 26, 29, 34, 37, 43, 44, // inner sides
                          10, 11, 12, 13, 17, 22, 25, 30, // mid sides
                          33, 38, 41, 46, 50, 51, 52, 53,
                           1, 6, 8, 15, 48, 55, 57, 62,   // C-squares
                           9, 14, 49, 54 );               // X-squares

    foreach ($plays as $play) {
      if ($board[$play] == '.' && can_play($board, $piece, $play)) {
         $board[$play] = $piece;
         return $board;
      }
    }
    return null;
  }

?>