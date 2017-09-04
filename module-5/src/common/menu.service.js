(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', 'UserInfoService'];
function MenuService($http, ApiPath, UserInfoService) {
  var service = this;

  var tempParam = 0;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItemInfo = function (short_name) {
    var url = ApiPath + '/menu_items/' + short_name + '.json';
    return $http.get(url).then(function (response) {
      var iteminfo = {
        title: response.data.name,
        description: response.data.description,
        image: (ApiPath + "/images/" + response.data.short_name + ".jpg")
      }
      return iteminfo;
    });
  }

}


})();
