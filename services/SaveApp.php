<?php

  include ("dbconnection.php");

  $postdata = file_get_contents("php://input");
  $arr = json_decode($postdata, true);

  // This updates both the vending machine items data and user possessions data

  // This sets the data the vending_machine_items table
  foreach($arr['vendingdata'] as $item) {

    $itemID = $item['vending_machine_item_id'];

    $updateVMQuery = "UPDATE vending_machine_items SET quantity= '" .$item['quantity'] ."' WHERE vending_machine_item_id = " .$itemID;

    mysqli_query($connection, $updateVMQuery) or die("Error in Selecting " . mysqli_error($connection));

  }

// This sets the data the user_possessions table
  foreach($arr['userPossessions'] as $possession) {
    $possessionID = $possession['possession_id'];
    // This tests if the array has a possession_id
    // Items already in the database will have an id, but
    // Items that do not have an id must be inserted
    if ($possessionID == true) {

      $updatePossessionQuery = "UPDATE user_possessions SET quantity = '" .$possession['quantity'] ."' WHERE possession_id = " .$possessionID;
      // updates database if there's an existing item
      mysqli_query($connection, $updatePossessionQuery) or die("Error in Selecting " . mysqli_error($connection));
    }

    else {
      // Adds a new item if there's no existing item in the database
      $addPossession = "INSERT INTO user_possessions (possession_id, item_name, quantity)
      VALUES (DEFAULT, '" .$possession['item_name'] ."', '" .$possession['quantity'] ."')";
      mysqli_query($connection, $addPossession) or die("Error in Selecting " . mysqli_error($connection));

    }
  }


mysqli_close($conection);




 ?>
