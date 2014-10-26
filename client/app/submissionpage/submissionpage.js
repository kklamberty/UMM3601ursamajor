'use strict';

angular.module('umm3601ursamajorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submissionpage', {
        url: '/submissionpage',
        templateUrl: 'app/submissionpage/submissionpage.html',
        controller: 'SubmissionpageCtrl'
      });
  });