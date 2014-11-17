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

        $scope.statusEditorColor = function(status){
            return {'border-left': '4px solid rgb(' + status.color.red + ','
                                                 + status.color.green + ','
                                                 + status.color.blue + ')'};
        };
        $scope.submitChanges = function() {
            var r = confirm("Are you sure you want to edit the status?")
            if (r == true) {
                for(var x = 0; x < $scope.statusArray.length; x++){
                    $http.put('/api/statuss/' + $scope.statusArray[x]._id,
                        {
                            strict: $scope.statusArray[x].strict,
                            color: $scope.statusArray[x].color,
                            emailSubject: $scope.statusArray[x].emailSubject,
                            emailBody: $scope.statusArray[x].emailBody
                        }
                    ).success(function () {
                            $location.path('/admin');
                        })
                }
            }
        };
    });
