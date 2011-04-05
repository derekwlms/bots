
 var url = "http://derekwilliams.us/bots/reversi";  // Your bot here
 var board = "...........................OX..." +
             "...XO...........................";

 function userMove(row, col) {
   var index = (row*8) + col;
   var play = board.substr(0, index) + "X" + board.substr(index + 1);
   board = updateBoard(board, play);
   if (board.indexOf(".") >= 0)
     callBot();
   else
     showBoard();
 }

 function callBot() {
   var fullUrl = url + "?board=" + board + "&piece=O";
   $.get(fullUrl, "", function(play) { botReturn(play) }, "text");
 }

 function botReturn(play) {
   board = updateBoard(board, play);
   showBoard();
 }

 function showBoard() {
   var boardTable = document.getElementById("boardTable");
   var scores = new Array();
   scores["X"] = 0;   scores["O"] = 0;
   for (var row=0; row<8; row++) 
     for (var col=0; col<8; col++) {
       var piece = board.charAt((row*8)+col);
       scores[piece]++;
       var cellContents = "<img src='" + imageForPiece(piece) + "'>";
       if (piece == "." && canPlay(board, "X", (row*8)+col))
         cellContents = "<a href='javascript:userMove(" + row + "," + col + ")'>" 
		                                          + cellContents + "</a>";
       boardTable.rows[row].cells[col].innerHTML = cellContents;
     }
   document.getElementById("score").innerHTML = "Black: " + scores["X"] + ", White: " + scores["O"];
 }

 // Helpers based on reversimove.php:

 function imageForPiece(piece) {
   switch(piece) {
     case "X": return "black.jpg";
     case "O": return "white.jpg";
     default : return "green.jpg";
   }
 }

 function canPlay(board, piece, position) {
    // Look in all 8 directions for a line where my opponent
    // is "sandwiched" between my piece and the current position.
    var directions = getDirections();
    for (var i=0; i<8; i++) 
      if (hasLine(board, piece, position, directions[i][0], directions[i][1]))
        return true;
    return false;
  }

  function getDirections() {
    if (typeof getDirections.directions == "undefined")
      getDirections.directions = new Array(new Array(1, 0),  new Array(1, 1),  
                                           new Array(0, 1),  new Array(-1, 1), 
                                           new Array(-1, 0), new Array(-1, -1),
                                           new Array(0, -1), new Array(1, -1) );
    return getDirections.directions;
  }

  function hasLine(currentBoard, piece, position, rowChange, colChange) {
    var otherPiece = "O";
    if (piece == "O")
      otherPiece = "X";
    var otherCount = 0;
    var row = Math.floor(position / 8);
    var col = position % 8;
    for (var i=0; i<9; i++) {
        row += rowChange;
        col += colChange;
        if (row<0 || row>7 || col<0 || col>7)   // out of bounds
            return false;
        var currentPiece = currentBoard.charAt((row*8)+col);
        if (currentPiece == otherPiece)
           otherCount++;
        else if ((otherCount > 0) && (currentPiece == piece))
	   return true; // sandwiched opponent
	else
	   return false;
    }
    return false;
  }

  function updateBoard(oldBoard, newBoard) {
    var piece, position=-1;
    // Find the move just taken.  Trust the bot not to cheat.
    for (var i=0; i<64; i++) {
        if (newBoard.charAt(i) != oldBoard.charAt(i)) {
           position = i;
           piece = newBoard.charAt(i);
           break;
        }
    }
    // Flip pieces in all 8 directions from the current move.
    if (position>0) {
       var directions = getDirections();
       for (var i=0; i<8; i++) 
         if (hasLine(newBoard, piece, position, directions[i][0], directions[i][1]))
           newBoard = flipPieces(newBoard, piece, position, directions[i][0], directions[i][1]);
    }
    return newBoard;
  }

  function flipPieces(currentBoard, piece, position, rowChange, colChange) {
    var otherPiece = "O";
    if (piece == "O")
      otherPiece = "X";
    var row = Math.floor(position / 8);
    var col = position % 8;
    for (var i=0; i<9; i++) {
        row += rowChange;
        col += colChange;
        if (row<0 || row>7 || col<0 || col>7)   // out of bounds
            return;
        var currentPiece = currentBoard.charAt((row*8)+col);
        if (currentPiece == otherPiece) {
           var index = (row*8) + col;
           currentBoard = currentBoard.substr(0, index) + piece + currentBoard.substr(index + 1);
	} else 
           return currentBoard;
    }
    return currentBoard;
  }

