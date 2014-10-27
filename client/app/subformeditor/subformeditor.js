'use strict';

angular.module('umm3601ursamajorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('subformeditor', {
        url: '/subformeditor',
        templateUrl: 'app/subformeditor/subformeditor.html',
        controller: 'SubformeditorCtrl'
      });
  });