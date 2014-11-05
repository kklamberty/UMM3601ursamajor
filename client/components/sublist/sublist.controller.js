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

    .controller('SublistCtrl', function ($scope, $http, socket, $modal, Modal, Auth) {
        $scope.submissions = [];

        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.email = Auth.getCurrentUser().email;

        $scope.isReviewer = Auth.isReviewer;

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.canSeeSub = function(submission) {
            if($scope.isReviewer) {
                if (submission.reviewers.indexOf($scope.email) != -1) {
                    return true;
                }
            }
            return $scope.email === submission.presenterInfo.email ||
                   $scope.email === submission.copresenterOneInfo.email ||
                   $scope.email === submission.copresenterTwoInfo.email ||
                   $scope.getCurrentUser().role == "admin";
        };

        $http.get('/api/submissions').success(function(submissions) {
            $scope.submissions = submissions;
            socket.syncUpdates('submission', $scope.submissions);
        });


        var sendGmail = function(opts){
            var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
                '&to=' + opts.to +
                '&su=' + opts.subject +
                '&body=' + opts.message +
                '&ui=1';
            location.href = str;
        };
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
                case "Approved"://        $scope.presenterEmail = presenterInfo().email;

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
            $scope.resetTemps();
        };

        $scope.resetSelection = function(){
            $scope.selection.selected = false;
            $scope.resetTemps();$scope.selection.item.presenterInfo.email
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
            options: ["Awaiting Adviser Approval", "Approved", "Awaiting Revisions", "Pending Review"],
            temp: {strict: "", text: ""}
        };

        $scope.resetTemps = function() {
            if($scope.selection.item != null){
                $scope.statusEdit.temp.strict = $scope.selection.item.status.strict;
                $scope.statusEdit.temp.text = $scope.selection.item.status.text;
            }
        };

        $scope.resetTemps();

        $scope.editStatus = function(){
            $scope.statusEdit.editing = !$scope.statusEdit.editing;
            $scope.resetTemps();
        };

        $scope.submitStatusEdit = function(){
            $http.patch('api/submissions/' + $scope.selection.item._id,
                {status: {strict: $scope.statusEdit.temp.strict, text: $scope.statusEdit.temp.text}}
            ).success(function(){
                    console.log("Successfully updated status of submission");
            });


            if($scope.selection.item.approval && $scope.statusEdit.temp.strict === "Awaiting Adviser Approval"){
                $http.patch('api/submissions/' + $scope.selection.item._id,
                    {approval: false}
                ).success(function(){
                    $scope.selection.item.approval = false;
                    console.log("Successfully updated approval of submission (un-approved)");
                });
            } else if(!$scope.selection.item.approval && $scope.statusEdit.temp.strict !== "Awaiting Adviser Approval"){
                $http.patch('api/submissions/' + $scope.selection.item._id,
                    {approval: true}
                ).success(function(){
                    $scope.selection.item.approval = true;
                    console.log("Successfully updated approval of submission (approved)");
                });
            }
            sendGmail({
                to: $scope.selection.item.presenterInfo.email,
                subject: 'URS Submission Test',
                message: ''
            });

            $scope.selection.item.status.strict = $scope.statusEdit.temp.strict;
            $scope.selection.item.status.text = $scope.statusEdit.temp.text;
            $scope.resetTemps();
            $scope.editStatus();
        };

        

        $scope.approvalWordChange = function(approval){
             if(approval){
                 return "Yes";
                 }
             else{
                 return "No";
                 }
             };


    });