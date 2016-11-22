var vendingMachineApp = angular.module("vendingMachineApp", []);

// --------------
// Hello! There are 2 controllers for this application:
//    1. vendingMachine controller
//    2. vendingMachinePanel controller
//
// There is 1 factory (Model)
//    1. data
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// 1. VENDING MACHINE CONTROLLER
// ------------------------------------------------------------------------
// There are 2 functions within this controller:
//
// 1. getVendingMachineItems()
// 2. selectedBox()
// ------------------------------------------------------------------------
vendingMachineApp.controller("vendingMachine", ['$scope', '$http', 'data' , function($scope, $http, data){

getVendingMachineItems(); // Displays all vending machine items

  // 1. getVendingMachineItems()
  function getVendingMachineItems(){
    $http({
      method: 'GET',
      url: '/vendingMachineApp/services/VendingMachineItems.php'
    }).then(function successCallback(response){
      data.setVendingMachineItemData(response.data);
      $scope.vendingMachineItems = data.getVendingMachineItemData();
      // ---------------------------------------------------------------------
      // This block determines how many items come from the response and
      // adds the corresponding item number to each VendingMachineItem object.
      // This allows for the item number to change accordingly even if an
      // item in the database is added or deleted.
      var vmItemCnt = $scope.vendingMachineItems.length;
      for(var i = 0; i < vmItemCnt; i++){
        $scope.vendingMachineItems[i]["itemNum"] = i + 1;

      }
      // ---------------------------------------------------------------------

    },function errorCallback(response) {  // ERROR RESPONSE
        $scope.message = "Unable to retrieve Vending Machine Items";
    });
  }

  // 2. selectedBox()
  // This function determines the itemNumber of the box selected
  // and sets the box number for the 2nd controller to use
  $scope.selectedBox = function (indexOfItemBox) {
    data.setSelectedBoxNum(indexOfItemBox);
  }


}]);
// END VENDING MACHINE CONTROLLER
// ------------------------------------------------------------------------






// ------------------------------------------------------------------------
// 2. VENDING MACHINE PANEL CONTROLLER
// ------------------------------------------------------------------------
// There are 3 functions within this controller:
//
// 1. getUserPossessions()
// 2. clickedBuy()
// 3. clickedSave()
//
// There is 1 watch function
//
// 1. watches data.getSelectedBoxNum()
// ------------------------------------------------------------------------

vendingMachineApp.controller("vendingMachinePanel", ["$scope", "$http", 'data' , function($scope, $http, data) {
  $scope.messageFeedback = ""; // The Error and success message
  $scope.clickSuccess = false; // Determines if the click action was a success

  getUserPossessions(); // Gets all of the user's possessions/purchases
  // 1. getUserPossessions()
  function getUserPossessions(){
    $http({
      method: "GET",
      url: '/vendingMachineApp/services/UserPossessions.php'

    }).then(function successCallback(response){
      // Sets the purchases/ possessions
      data.setUserPossessionsData(response.data);
      $scope.userPossessions = data.getUserPossessionsData();

    },function errorCallback(response) { // ERROR RESPONSE
        $scope.message = "Unable to retrieve User's purchases";
    });
  }




  // Actions for when the user clicks "Buy" button
  $scope.clickedBuy = function() {
    $scope.clickSuccess = true; // click action successful
    // When clicking buy, the number inputted must be between 1-9
    if($scope.itemNumber < 10 && $scope.itemNumber > 0){
      $scope.messageFeedback = "Success! Transaction complete!";

      // -----SETS VENDING MACHINE ITEMS-----
      var itemNum = $scope.itemNumber - 1;
      var vendingMachineItems = data.getVendingMachineItemData();

      // Removes 1 from the selected vending machine item's quantity
      vendingMachineItems[itemNum]["quantity"] = parseInt(vendingMachineItems[itemNum]["quantity"]) - 1;
      data.setVendingMachineItemData(vendingMachineItems);
      // -----END SET VENDING MACHINE ITEMS BLOCK-----


      // -----SETS USER POSSESSIONS BLOCK-----
      var userPossessions = data.getUserPossessionsData();
      var isAlreadyPurchased = false; // To check if item has been purchased

      // Adds 1 to an existing user item's quantity if the item has already been purchased
      for(var i = 0; i < userPossessions.length; i++) {
          if (userPossessions[i]["item_name"] === vendingMachineItems[itemNum]["item_name"]) {
            userPossessions[i]["quantity"] = parseInt(userPossessions[i]["quantity"]) + 1;
            data.setUserPossessionsData(userPossessions);
            isAlreadyPurchased = true;
          }
        }

      // Adds a new object to the user's possessions/purchases consisting of
      // the item_name and quantity if item has not been purchased
      if (isAlreadyPurchased === false) {
        userPossessions.push({
          "item_name" : vendingMachineItems[itemNum]["item_name"],
          "quantity" : 1
        });
      }
      // ------END SET USER POSSESSIONS BLOCK--------
    } else { // Displays Error Message
      $scope.messageFeedback = "ERROR! Number must be between 1-9!";
      $scope.clickSuccess = false;
    }
  }


  // 2. clickedSave()
  $scope.clickedSave = function() {

    // Displays successful message
    $scope.clickSuccess = true;
    $scope.messageFeedback = "Your progress has been saved! Go Refresh!";

  var totalData = {
      vendingdata: data.getVendingMachineItemData(),
      userPossessions:data.getUserPossessionsData()
    }

    $http({
      method: "POST",
      url: '/vendingMachineApp/services/SaveApp.php',
      data: totalData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data, status, headers, config) {
      console.log(data);

    }).
    error(function(data, status, headers, config) {
      console.log(data, status);
    });

  }

  // 1. Watch function
  // Watches if a box was selected and changes the input number in the panel to the
  // value of that box
  $scope.$watch(function(){
   return data.getSelectedBoxNum();
}, function(newValue, oldValue){
  if(newValue != null) {
    $scope.changeitemNumber(newValue + 1);
  }
  
  $scope.changeitemNumber = function(newValue){
    $scope.itemNumber = newValue;
  }

});


}]);

// END VENDING MACHINE PANEL CONTROLLER
// ------------------------------------------------------------------------








// ------------------------------------------------------------------------
// VENDING MACHINE CUSTOM FACTORY / SERVICE
// ------------------------------------------------------------------------

vendingMachineApp.factory('data' , function() {


  var itemBoxNum = null;
  var vendingMachineItems = null;
  var userPossessions = null;

  return {

    // GET & SETTER FOR VENDING MACHINE ITEMS
    getVendingMachineItemData: function(){
      return vendingMachineItems;
    },
    setVendingMachineItemData: function(items){
      vendingMachineItems = items;
    },

    // GET & SETTTER FOR BOX NUMBER SELECTION
    getSelectedBoxNum: function() {
      return itemBoxNum;
    },
    setSelectedBoxNum: function(indexOfItemBox) {
      itemBoxNum = indexOfItemBox;
    },

    // GET & SETTTER FOR USER POSSESSIONS
    getUserPossessionsData: function(){
      return userPossessions;
    },
    setUserPossessionsData: function(possessions){
      userPossessions = possessions;
    }
  }

});
