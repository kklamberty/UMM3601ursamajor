/**
 * Created by opdah023 on 10/9/14.
 */
'use strict';

angular.module('umm3601ursamajorApp')
    .filter('isntempty', function(){
        return function(item, title){
            if(typeof(item) == "object"){
                if(item.length > 0){
                    return title + " " + item;
                }
            } else if (item !== "" && item !== null){
                return title + " " + item;
            }
        }
    })

    .controller('SublistCtrl', function ($scope, $http, socket, $modal, Modal) {
        $scope.submissions = [];

        $http.get('/api/submissions').success(function(submissions) {
            $scope.submissions = submissions;
            socket.syncUpdates('submission', $scope.submissions);
        });

        $scope.statusColorTab = function(status){
            switch(status){
                case "Pending Review":
                    return {'border-left': '4px solid rgba(255, 220, 10, 1)'};
                    break;
                case "Awaiting Revisions":
                    return {'border-left': '4px solid rgba(0, 100, 255, 1)'};
                    break;
                case "Approved":
                    return {'border-left': '4px solid rgba(0, 255, 0, 1)'};
                    break;
                case "Awaiting Adviser Approval":
                    return {'border-left': '4px solid rgba(255, 0, 0, 1)'};
                    break;
            }
        };

        $scope.statusColorBody = function(status){
            switch(status){
                case "Pending Review":
                    return {'background-color': 'rgba(255, 220, 10, 1)'};
                    break;
                case "Awaiting Revisions":
                    return {'background-color': 'rgba(0, 100, 255, 1)'};
                    break;
                case "Approved":
                    return {'background-color': 'rgba(0, 255, 0, 1)'};
                    break;
                case "Awaiting Adviser Approval":
                    return {'background-color': 'rgba(255, 0, 0, 1)'};
                    break;
            }
        };

        // Controlling selection of submission for detail view
        $scope.selection = {selected: false, item: null};

        $scope.selectItem = function(itemIndex){
            console.log("setting index " + itemIndex + " as active item");
            $scope.selection.selected = true;
            $scope.selection.item = $scope.submissions[itemIndex];
        };

        $scope.resetSelection = function(){
            $scope.selection.selected = false;
        };

        $scope.deleteSubmissionConfirm = function(item){
            Modal.confirm.delete($scope.deleteSubmission)(item.title, item);
        };

        $scope.deleteSubmission = function(item){
            console.log("Deleting submission: " + item.title);
            $http.delete('/api/submissions/' + item._id);
            $scope.resetSelection();
        };

        // Controlling editing of status in details view
        $scope.statusEdit = {
            editing: false,
            options: ["Awaiting Adviser Approval", "Approved", "Awaiting Revisions", "Pending Review"]
        };

        $scope.editStatus = function(){
            $scope.statusEdit.editing = !$scope.statusEdit.editing;
        };

        $scope.submitStatusEdit = function(){
            $http.patch('api/submissions/' + $scope.selection.item._id,
                {status: {strict: $scope.selection.item.status.strict, text: $scope.selection.item.status.text}}
            ).success(function(){
                    console.log("Success!!!");
                });
            $scope.editStatus();
        }


    });