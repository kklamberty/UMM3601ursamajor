'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubmissionpageCtrl', function ($scope, Auth, $location) {
        if(Auth.isLoggedIn() === false) {
            $location.path('/');
        }
        $scope.isLoggedIn = Auth.isLoggedIn;

  });
