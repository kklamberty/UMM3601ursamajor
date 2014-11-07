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

    .controller('SublistCtrl', function ($scope, $http, socket, $modal, Modal, Auth, $window) {
        $scope.submissions = [];

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.email = Auth.getCurrentUser().email;

        $scope.isReviewer = Auth.isReviewer;

        $scope.isAdmin = Auth.isAdmin;

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.hasCoPresenter = function(submission){
            return submission.copresenterOne.first === null;
        }

        $scope.hasCoPresenterTwo = function(submission){
            return submission.copresenterTwo.first === null;
        }

        $scope.isPresenter = function(submission) {
            return $scope.email === submission.presenterInfo.email;
        };

        $scope.isCoPresenter = function(submission) {
            return $scope.email === submission.copresenterOneInfo.email ||
                   $scope.email === submission.copresenterTwoInfo.email;
        };

        $scope.canSeeSub = function(submission) {
            return $scope.isAdmin() ||
                   ($scope.isReviewer() && (submission.reviewers.indexOf($scope.email) != -1)) ||
                   $scope.isPresenter(submission) || $scope.isCoPresenter(submission);
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
            $window.open(str);
        };

        $scope.statusColorTab = function(status){
            switch(status){
                case "Awaiting Adviser Approval":
                    return {'border-left': '4px solid rgba(255, 0, 0, 1)'};
                    break;
                case "Reviewing in Process":
                    return {'border-left': '4px solid rgba(255, 220, 10, 1)'};
                    break;
                case "Revisions Needed":
                    return {'border-left': '4px solid rgba(0, 100, 255, 1)'};
                    break;
                case "Accepted":
                    return {'border-left': '4px solid rgba(0, 255, 0, 1)'};
                    break;
            }
        };

        $scope.statusColorBody = function(status){
            switch(status){
                case "Awaiting Adviser Approval":
                    return {'background-color': 'rgba(255, 0, 0, 1)'};
                    break;
                case "Reviewing in Process":
                    return {'background-color': 'rgba(255, 220, 10, 1)'};
                    break;
                case "Revisions Needed":
                    return {'background-color': 'rgba(0, 100, 255, 1)'};
                    break;
                case "Accepted":
                    return {'background-color': 'rgba(0, 255, 0, 1)'};
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
            $scope.resetTemps();
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
            options: ["Reviewing in Process",
                "Revisions Needed",
                "Accepted"],
            subject:"URS submission update",
            body:[ ", your URS submission has been approved by your adviser.",
                  ", your URS submission has been flagged for revisions, and is in need of changes.",
                ", your URS submission has been approved, congratulations!"],
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


            $scope.selection.item.status.strict = $scope.statusEdit.temp.strict;
            $scope.selection.item.status.text = $scope.statusEdit.temp.text;

            sendGmail({
                to: $scope.selection.item.presenterInfo.email,
                subject: $scope.statusEdit.subject,
                message: $scope.selection.item.presenterInfo.first + $scope.statusEdit.body[$scope.statusEdit.options.indexOf($scope.selection.item.status.strict)]
            });
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