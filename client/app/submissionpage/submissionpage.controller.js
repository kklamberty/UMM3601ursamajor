'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubmissionpageCtrl', function ($scope, Auth) {
//        if(Auth.isLoggedIn() === false) {
//            $location.path('/login');
//        }
        $scope.isLoggedIn = Auth.isLoggedIn;

  });
