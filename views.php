<?php
  $counter_file = 'counter.txt';
  $counter = file_get_contents($counter_file);
  $counter++;
  file_put_contents($counter_file, $counter);
?>
