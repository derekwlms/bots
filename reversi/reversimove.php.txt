<?php
  function can_play($board, $piece, $position) {
    // Look in all 8 directions for a line where my opponent
    // is "sandwiched" between my piece and the current position.
   foreach (get_directions() as $direction)
     if (has_line($board, $piece, $position, $direction[0], $direction[1]))
        return true;
    return false;
  }

  function get_directions() {
    STATIC $directions = array(array(1, 0),  array(1, 1),  
                               array(0, 1),  array(-1, 1), 
                               array(-1, 0), array(-1, -1),
                               array(0, -1), array(1, -1) );
    return $directions;
  }

  function has_line($board, $piece, $position, $rowchange, $colchange) {
    $otherpiece = $piece == 'X' ? 'O' : 'X';
    $othercount = 0;
    $row = (int) ($position / 8);
    $col = $position % 8;
    for ($i=0; $i<9; $i++) {
        $row += $rowchange;
        $col += $colchange;
        if ($row<0 || $row>7 || $col<0 || $col>7)   // out of bounds
            return false;
        if (($currentpiece = $board[($row*8)+$col]) == $otherpiece)
           $othercount++;
        else
           return (($othercount > 0) && ($currentpiece == $piece));  // sandwiched opponent
     }
     return false;
  }

  function update_board($board, $newboard) {
    // Find the move just taken.  Trust the bot not to cheat.
    for ($i=0, $position=-1; $i<strlen($board); $i++) {
        if ($newboard[$i] != $board[$i]) {
            $position = $i;
            $piece = $newboard[$i];
            break;
        }
    }
    // Flip pieces in all 8 directions from the current move.
    if ($position>0)
       foreach (get_directions() as $direction)
         if (has_line($newboard, $piece, $position, $direction[0], $direction[1]))
           $newboard = flip_pieces($newboard, $piece, $position, $direction[0], $direction[1]);
    return $newboard;
  }

  function flip_pieces($board, $piece, $position, $rowchange, $colchange) {
    $otherpiece = $piece == 'X' ? 'O' : 'X';
    $othercount = 0;
    $row = (int) ($position / 8);
    $col = $position % 8;
    for ($i=0; $i<9; $i++) {
        $row += $rowchange;
        $col += $colchange;
        if ($row<0 || $row>7 || $col<0 || $col>7)   // out of bounds
            return;
        if ($board[($row*8)+$col] == $otherpiece)
           $board[($row*8)+$col] = $piece;
        else
           return $board;
     }
     return $board;
  }
?>
