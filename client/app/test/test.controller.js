'use strict';

angular.module('umm3601ursamajorApp')
  .controller('TestCtrl', function ($scope,$document) {

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
        $scope.textArea = "<b>Hello</b>";

        $scope.startIndex = 0;
        $scope.endIndex = 0;

        console.log($document[0].getElementById('ta').selectionStart);
        console.log( $document.prop( "body" ) );


        $scope.customParams = {};


        $scope.getIndex = function(id){
            console.log($document[0].getElementById(id).selectionStart);
            console.log($document[0].getElementById(id).selectionEnd);
        }

        });
