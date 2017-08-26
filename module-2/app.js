(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;

  buy.items = ShoppingListCheckOffService.getToBuyItems();

  buy.empty = function () {
    return ShoppingListCheckOffService.toBuyEmpty();
  };

  buy.markAsBought = function (itemIndex) {
    ShoppingListCheckOffService.markAsBought(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

  bought.empty = function () {
    return ShoppingListCheckOffService.alreadyBoughtEmpty();
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var toBuyItems = [];

  // List of already bought items
  var alreadyBoughtItems = [];

  // initialize to buy list
  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    toBuyItems.push(item);
  };

  service.addItem("cookies", "3");
  service.addItem("pepsi", "1");
  service.addItem("apples", "4");
  service.addItem("chicken legs", "7");
  service.addItem("toilet paper", "20");

  service.markAsBought = function (itemIndex) {
    alreadyBoughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.toBuyEmpty = function () {
    return toBuyItems.length == 0;
  };

  service.getAlreadyBoughtItems= function () {
    return alreadyBoughtItems;
  };

  service.alreadyBoughtEmpty = function () {
    return alreadyBoughtItems.length == 0;
  };
}

})();
