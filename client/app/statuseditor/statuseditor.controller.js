'use strict';

angular.module('umm3601ursamajorApp')
  .controller('StatuseditorCtrl', function ($scope, $http, Auth, $location, User) {
        if(Auth.isAdmin() || Auth.isChair()) {
        } else {
            $location.path('/');
        }
        $scope.users = User.query();
        $scope.isAdmin = Auth.isAdmin;
        $scope.isChair = Auth.isChair;
        $scope.statusArray = [];


        $http.get('/api/statuss').success(function(statusArray) {
            $scope.statusArray = statusArray;
        });
        $scope.submitChanges = function() {
            var r = confirm("Are you sure you want to edit the status?")
            if (r == true) {
                $http.put('/api/statuss/' + $scope.status._id,
                    {
                    strict: $scope.status.strict,
                    color: $scope.status.color,
                    emailSubject: $scope.status.emailSubject,
                    emailBody: $scope.status.emailBody
                    }
                ).success(function () {

                        $location.path('/admin');

                    });
            };
        };
  });
