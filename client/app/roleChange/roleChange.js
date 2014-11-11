'use strict';

angular.module('umm3601ursamajorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roleChange', {
        url: '/roleChange',
        templateUrl: 'app/roleChange/roleChange.html',
        controller: 'RoleChangeCtrl'
      });
  });