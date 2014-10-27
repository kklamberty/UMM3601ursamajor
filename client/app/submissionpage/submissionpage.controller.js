'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubmissionpageCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;

  });
