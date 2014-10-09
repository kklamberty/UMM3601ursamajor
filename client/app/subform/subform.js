'use strict';

angular.module('umm3601ursamajorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('subform', {
        url: '/subform',
        templateUrl: 'app/subform/subform.html',
        controller: 'SubformCtrl'
      });
  });