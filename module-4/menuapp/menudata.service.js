;(function () {
  'use strict'

  angular.module('Data')
  .constant('API', 'https://davids-restaurant.herokuapp.com/')
  .service('MenuDataService', MenuDataService)

  MenuDataService.$inject = ['$http', 'API']
  function MenuDataService ($http, API) {
    var service = this
    service.list = []
    service.items = []

    service.getAllCategories = function () {
      var list = $http({
        method: 'GET',
        url: (API + 'categories.json'),
        cache: true
      }).then(
        function (response) {
          service.list = response.data
          return service.list
        })

      return list
    }

    service.getItemsForCategory = function (categoryShortName) {
      var items = $http({
        method: 'GET',
        url: (API + 'menu_items.json?category=' + categoryShortName),
        cache: true
      }).then(
        function (response) {
          service.items = response.data
          return service.items
        })

      return items
    }
  }
})()
