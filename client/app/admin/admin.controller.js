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
            [   {id: 1, role: 'user'},
                {id: 2, role: 'member'},
                {id: 3, role: 'admin'}
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

        $scope.changeRole = function(role, user) {
            console.log(user);
            console.log(role);
            if(confirm(role + user +'Are you sure you want to update this users role?')) {
                Auth.changeRole(role, user);
            };
        };
    });
