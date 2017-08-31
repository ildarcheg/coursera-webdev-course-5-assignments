;(function () {
  'use strict'

  angular.module('MenuApp').config(RoutesConfig)

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
  function RoutesConfig ($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/')

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'menuapp/templates/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'menuapp/templates/allCategories.template.html',
      controller: 'MenuDataController as categories',
      resolve: {
        list: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories()
        }]
      }
    })
    .state('categories.items', {
      url: '/items/category-{categoryShortName}',
      templateUrl: 'menuapp/templates/allItems.template.html',
      controller: 'ItemsController as categoryItems',
      resolve: {
        items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
        }]
      }
    })
  }
})()
