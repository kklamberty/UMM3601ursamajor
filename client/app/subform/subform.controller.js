'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubformCtrl', function ($scope, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.formatOptions =
        ['Artist Statement',
         'Humanities Proposal',
         'Science or Social Science Abstract'
        ];

    $scope.presentationTypes =
        ['Poster or visual display',
         'Oral presentation',
         'Performance'
        ];

    $scope.values = [
        {pres_title: String},
        {pres_abstract: String}
    ];

    $scope.charsRemaining = function() {
        return 1000 - $scope.values.pres_abstract.length;
    }

  });
