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

    $scope.fundingSources = [
        'UROP',
        'MAP',
        'MMP',
        'LSAMP'
    ];

    $scope.submissionData = {
        title: "",
        format: "",
        abstract: "",
        presentationType: "",
        formatChange: Boolean,
        presenterInfo: {first: "", last: "", email: ""},
        copresenterOne: {first: "", last: "", email: ""},
        copresenterTwo: {first: "", last: "", email: ""}
    };

    $scope.charsRemaining = function() {
        return 1000 - $scope.submissionData.abstract.length;
    }

  });
