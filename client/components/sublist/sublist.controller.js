/**
 * Created by opdah023 on 10/9/14.
 */
'use strict';

angular.module('umm3601ursamajorApp')
    .controller('SublistCtrl', function ($scope, $http) {

        $scope.submissions = [];

        $http.get('/api/submissions').success(function(submissions) {
            $scope.submissions = submissions;
        });
    });
