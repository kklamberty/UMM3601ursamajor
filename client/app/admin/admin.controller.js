'use strict';

angular.module('umm3601ursamajorApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User, $location) {
        if(!Auth.isAdmin()) {
            $location.path('/');
        }

        // Use the User $resource to fetch all users
        $scope.users = User.query();
        $scope.isAdmin = Auth.isAdmin;
//
//    $scope.submissions = [];
//
//    $http.get('/api/submissions').success(function(submissions) {
//        $scope.submissions = submissions;
//    });

        $scope.roleOptions =
            [   'user',
                'member',
                'admin'
            ];
        $scope.role = "";

        $scope.userIsAdmin = function(user){
            return user.role === "admin";
        };
        $scope.userIsMember = function(user){
            return user.role === "member";
        };
        $scope.userIsUser = function(user){
            return user.role === "user";
        };


        $scope.delete = function(user) {
            User.remove({ id: user._id });
            angular.forEach($scope.users, function(u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };

        $scope.changeRole = function(user) {
            console.log(user);
            if(confirm('Are you sure you want to update this users role?')) {
                Auth.changeRole(user.role, user);
            };
        };
    });
