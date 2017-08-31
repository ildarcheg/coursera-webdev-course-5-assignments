;(function () {
  'use strict'

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'menuapp/templates/categories.template.html',
    bindings: {
      list: '<'
    }
  })
})()
