<?php

  include ("dbconnection.php");

// This code simply returns all items/possessions (including money)
// from the user_possessions table in the database as json.

$possessions_query = "SELECT * FROM user_possessions";
$result = mysqli_query($connection, $possessions_query) or die("Error in Selecting " . mysqli_error($connection));

$possessions = array();

while($row = mysqli_fetch_assoc($result))
{
    $possessions[] = $row;
}

echo json_encode($possessions);

mysqli_close($connection);

 ?>
