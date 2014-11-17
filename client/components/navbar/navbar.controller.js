'use strict';

angular.module('umm3601ursamajorApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isChair = Auth.isChair;
    $scope.getCurrentUser = Auth.getCurrentUser;
    //$scope.group = Auth.getCurrentUser.group;

//    $scope.loggedIn = function(){
//        if(Auth.email.indexOf("@morris") >= 0){
//            return true;
//        }continue=http://www.facebook.com
//        return false;
//    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');

/*
 document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://www.mysite.com";
 */
/*
 document.location.href = "https://www.google.com/accounts/Logout";
*/

    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });