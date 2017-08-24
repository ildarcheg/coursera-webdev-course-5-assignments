(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.checkIfTooMuch = function () {
    var numberOfDishes = getNumberOfDishes($scope.dishesList);
    var checkingResultMessage = "Please enter data first";

    if (numberOfDishes > 0 && numberOfDishes <= 3) {
      checkingResultMessage = "Enjoy!";
    } else if (numberOfDishes > 3) {
      checkingResultMessage = "Too much!";
    }

    $scope.checkingResultMessage = checkingResultMessage;
  };

  function getNumberOfDishes(dishesList) {
    var numberOfDishes = 0;
    // return 0 if there is no dishesList
    if (dishesList == undefined) {
      return numberOfDishes;
    }
    // remove spaces and split by comma
    dishesList = dishesList.replace(/ /g, "").split(",");
    // check if there is no empty string
    for (var i = 0; i < dishesList.length; i++) {
      if (dishesList[i] != "") {
        numberOfDishes += 1;
      }
    }
    return numberOfDishes;
  }

}

})();
