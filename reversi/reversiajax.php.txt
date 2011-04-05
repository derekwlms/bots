<head>
  <script type="text/javascript" src="jquery.js"></script>
  <script type="text/javascript" src="reversiajax.js" /></script>
</head>
<?php

  $xs = array(28, 35);
  $os = array(27, 36);
  $plays = array(19, 26, 37, 44);

  echo '<table id="boardTable" border="1">';
  for ($row=0; $row<8; $row++) {
    echo '<tr border="1">';
    for ($col=0; $col<8; $col++) {
      $position = ($row*8) + $col;
      if (in_array($position, $xs))
        echo '<td border="1"><img src="black.jpg"></td>';
      elseif (in_array($position, $os))
        echo '<td border="1"><img src="white.jpg"></td>';
      elseif (in_array($position, $plays))
	printf('<td border="1"><a href="javascript:userMove(%d, %d)"><img src="green.jpg"></td></a>', $row, $col);
      else
        echo '<td border="1"><img src="green.jpg"></td>';
    }
    echo '</tr>';
  }
  echo '</table><p id="score">Black: 2, White: 2</p>';
  echo '<p><a href="reversiajax.php">Start Over</a></p>'
?>