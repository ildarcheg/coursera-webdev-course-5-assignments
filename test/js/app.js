(function () {
'use strict';

angular.module('ACSApp', [])
.controller('RegController', RegController)
.service('RegService', RegService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


RegController.$inject = ['RegService'];
function RegController(RegService) {
  var reg = this;
  reg.showMessage = false;
  reg.messageContent = "";
  reg.showCheckEmail = false;
  reg.checkEmailMessage = "";

  reg.showMessageForUser = function () {
    reg.messageContent = "my text";
    reg.showMessage = !reg.showMessage;
    console.log("pressed");
  }

  reg.regNewUser = function () {
    reg.showCheckEmail = true;
    console.log("registred");
  }

  reg.logMenuItems = function () {
    var promise = RegService.getMenuForCategory("A");

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


RegService.$inject = ['$http', 'ApiBasePath'];
function RegService($http, ApiBasePath) {
  var service = this;

  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
