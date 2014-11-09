'use strict';

angular.module('umm3601ursamajorApp')
  .controller('TestCtrl', function ($scope) {

//  $scope.makeBold = function(documentID) {
////      var result = documentID.bold();
//      return documentID.bold();
//  };
//
//  $scope.makeItalisized = function(documentID) {
////      var result = documentID.italics();
//      return documentID.italics();
//  };
//
//  $scope.submitText = function() {
//      return $scope.testingText;
//  };


        $scope.makeBold = function() {
            var str = $scope.testText;
            var result = str.bold();
            return result;
        }

        $scope.makeItalisized = function() {
            var str = $scope.testText;
            var result = str.italics();
            return result;
        }



        });
