(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'matchedItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found != undefined && list.found.length === 0;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowController = this;
    narrowController.foundItems = [];

    narrowController.narrowIt = function () {
      if (narrowController.searchTerm === "") {
        narrowController.foundItems = []; 
        nothingFound();
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(narrowController.searchTerm);
        promise.then(function (response) {
          narrowController.foundItems = response;
          nothingFound();
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        }); 
      };
    };

    function nothingFound() {
      if (narrowController.foundItems.length == 0) {
        narrowController.message = "Nothing found";
      } else {
        narrowController.message = "";
      }
    }

    narrowController.showMessage = function() {
      return narrowController.message != undefined || narrowController.message !== ""
    };  

    narrowController.removeItem = function(index) {
      narrowController.foundItems.splice(index, 1);
    };   

  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      })
      .then(function (response) {
        var items = response.data.menu_items;
        var foundItems = []
        for (var index = 0; index < items.length; index++) {
          if (items[index].description.indexOf(searchTerm) != -1) {
            foundItems.push(items[index]);
          }
        }

        return foundItems;
      });

      return response;
    };

  }

})();
