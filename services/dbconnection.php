<?php
  $url = parse_url(getenv("CLEARDB_DATABASE_URL"));
  // $server = "localhost";
  // $username = "root";
  // $password = "root";
  // $database = "vending_machine_app";
  $server = $url["host"];
  $username = $url["user"];
  $password = $url["pass"];
  $database = substr($url["path"], 1);

  $connection =  mysqli_connect($server, $username, $password, $database);

  // My simple database connection
  if(!$connection) {
    die("Connection failed: " . mysqli_connect_error($connection));
  } else {
    echo "Database Connection Successful!";
  }


 ?>
