'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubformeditorCtrl', function ($scope, $http) {

        $scope.submissionTextArray = [];
        $scope.submissionText = {};

        // Need to get what should be the only seed subformtext from the database.
        // that will be the one that is updated each time the editor is used.
        $http.get('/api/subformtexts').success(function(submissionTextArray) {
            $scope.submissionTextArray = submissionTextArray;
            $scope.submissionText = $scope.submissionTextArray[0];
        });



  });
