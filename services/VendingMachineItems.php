<?php

include ("dbconnection.php");


// This code simply returns all items
// from the vending_machine_items table in the database as json.


$items_query = "SELECT * FROM vending_machine_items";
$result = mysqli_query($connection, $items_query) or die("Error in Selecting " . mysqli_error($connection));


$vendingMachineItems = array();
while($row = mysqli_fetch_assoc($result))
{
    $vendingMachineItems[] = $row;
}


echo json_encode($vendingMachineItems);

mysqli_close($conection);

 ?>
