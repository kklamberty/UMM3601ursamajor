'use strict';

angular.module('umm3601ursamajorApp')
  .controller('TestCtrl', function ($scope,$document,$http) {

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
        $scope.textArea = "The title of my project is called On Your March, Get Set, Rust! " +
            "The purpose of my experiment was to find out if salt water rusts nails faster than freshwater and which type of nails, " +
            "galvanized or common will rust quickly.The procedure involved sanding ten galvanized and common nails." +
            "The nails were placed in glass jars and added with 150mL of water mixed with 15mL of salt. The experiment was observed for two weeks. " +
            "The amount of rust was recorded on both types of nails. I repeated these steps for two types of nails in freshwater. " +
            "My results of my data resolves that galvanized and common nails in freshwater had a higher average or rust than the other nails in salt water. " +
            "My data also concludes that the rusting color was black. In conclusion the nails in freshwater rusted more than the nails in saltwater. " +
            "Saltwater may rust something faster than freshwater, but salt contains sodium chloride in which it causes the nails in saltwater to rust at a slower rate.";


        console.log($document[0].getElementById('ta').selectionStart);
        console.log( $document.prop( "body" ) );


        $scope.addComment = function(id){
            var commentObj = {};
            var comment = prompt('Comment Here');
            var start = $document[0].getElementById(id).selectionStart;
            var end = $document[0].getElementById(id).selectionEnd;
            commentObj.comment = comment;
            commentObj.start = start;
            commentObj.end = end;
            console.log(commentObj);
        }

        });
