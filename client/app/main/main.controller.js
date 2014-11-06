'use strict';

angular.module('umm3601ursamajorApp')
  .controller('MainCtrl', function ($scope, $http, Auth, socket) {

    $scope.isCollapsed = true;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentEmail = Auth.email;

    $scope.awesomeThings = [];

//    $scope.loggedIn = function() {
//        if($scope.getCurrentEmail.indexOf("@morris") >= 0){
//            return true;
//        }
//        return false;
//    };

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
