<?php

  $server = "localhost";
  $username = "root";
  $password = "root";
  $database = "vending_machine_app";

  $connection =  mysqli_connect($server, $username, $password, $database);

  // My simple database connection
  if(!$connection) {
    die("Connection failed: " . mysqli_connect_error($connection));
  } else {
    // echo "Database Connection Successful!";
  }


 ?>
