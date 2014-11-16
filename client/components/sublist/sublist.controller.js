/**
 * Created by opdah023 on 10/9/14.
 */
'use strict';
 //When we tested this function, it worked correctly with only two
 //parameters given, until we checked the final else case, in which
 // case it broke with only two parameters
angular.module('umm3601ursamajorApp')
    .filter('isntEmpty', function(){
        return function(input, title, altTitle){
            if(typeof(input) == "object"){
                if(input.length > 0){
                    return title + " " + input;
                }
            } else if (input !== "" && input !== null){
                return title + " " + input;
            } else {
                return altTitle;
            }
        }
    })

    .filter('fancyLimitTo', function(){
        return function(input, limit){
            return input.substring(0, limit) + "[...]";
        }
    })

    .controller('SublistCtrl', function ($scope, $http, socket, $modal, Modal, Auth, $window, $filter) {
        $scope.submissions = [];
        $scope.status = [];

        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.group = Auth.getCurrentUser().group;
        $scope.email = Auth.getCurrentUser().email;
        $scope.isReviewer = Auth.isReviewer;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isCoChair = Auth.isCoChair;

        //--------------------- Filter Functions -----------------------

        $scope.filterData = {
            searchText: "",
            orderByPredicate: "",
            reviewGroupFilterSelection: "All",
            reviewGroupFilterOptions: [
                "All",
                "Unassigned",
                "Review Group 1",
                "Review Group 2",
                "Review Group 3",
                "Review Group 4"
            ],
            tabFilter: {isPresenter:false, isCoPresenter:false, isReviewer:false, isAdviser:false}
        };

        $scope.setReviewGroupSelection = function(str) {
            $scope.filterData.reviewGroupFilterSelection = str;
        };

        $scope.hasAdminPrivs = function(){
            return (($scope.getCurrentUser.role != null && $scope.getCurrentUser.role == "Admin") || $scope.isAdmin() || $scope.isCoChair());
        };

        $scope.isPresenter = function(submission) {
            if(submission == null) return false;
            return $scope.email === submission.presenterInfo.email;
        };

        $scope.isCoPresenter = function(submission) {
            if(submission == null) return false;
            return $scope.email === submission.copresenterOneInfo.email ||
                $scope.email === submission.copresenterTwoInfo.email;
        };

        $scope.isAdviser = function(submission) {
            if(submission == null) return false;
            return $scope.email === submission.adviserInfo.email;
        };

        $scope.isReviewerGroup = function(submission){
            if(submission == null) return false;
            return $scope.group === submission.group;
        };

        $scope.hasPermissions = function(submission) {
            if(submission == null) return false;
            if(!Auth.isLoggedIn){
                console.log("Not logged in!");
                return false;
            }

            if($scope.hasAdminPrivs()){
                return true;
            } else {
                console.log("Not admin, is logged in");
                return $scope.isPresenter(submission) ||
                       $scope.isCoPresenter(submission) ||
                       $scope.isAdviser(submission) ||
                       $scope.isReviewerGroup(submission)
            }
        };

        $scope.reviewGroupFilter = function(submission) {
            if($scope.filterData.reviewGroupFilterSelection === "All"){
                return true;
            } else if($scope.filterData.reviewGroupFilterSelection === "Unassigned"){
                return submission.group == 0;
            } else if($scope.filterData.reviewGroupFilterSelection === "Review Group 1"){
                return submission.group == 1;
            } else if($scope.filterData.reviewGroupFilterSelection === "Review Group 2"){
                return submission.group == 2;
            } else if($scope.filterData.reviewGroupFilterSelection === "Review Group 3"){
                return submission.group == 3;
            } else if($scope.filterData.reviewGroupFilterSelection === "Review Group 4"){
                return submission.group == 4;
            } else {
                return false;
            }
        };

        $scope.searchFilter = function(submission){
            var searchText = $scope.filterData.searchText.toLowerCase();
            return(
                (submission.presenterInfo.first.toLowerCase().indexOf(searchText) != -1) ||
                (submission.presenterInfo.last.toLowerCase().indexOf(searchText) != -1) ||
                (submission.copresenterOneInfo.first.toLowerCase().indexOf(searchText) != -1) ||
                (submission.copresenterOneInfo.last.toLowerCase().indexOf(searchText) != -1) ||
                (submission.copresenterTwoInfo.first.toLowerCase().indexOf(searchText) != -1) ||
                (submission.copresenterTwoInfo.last.toLowerCase().indexOf(searchText) != -1) ||
                (submission.adviserInfo.first.toLowerCase().indexOf(searchText) != -1) ||
                (submission.adviserInfo.last.toLowerCase().indexOf(searchText) != -1)
            )
        };

        $scope.isPresenterOnAnything = function(){
           return ($filter('filter')($scope.submissions, $scope.isPresenter).length > 0)
        };

        $scope.isCoPresenterOnAnything = function(){
            return ($filter('filter')($scope.submissions, $scope.isCoPresenter).length > 0)
        };

        $scope.isAdviserOfAnything = function(){
            return ($filter('filter')($scope.submissions, $scope.isAdviser).length > 0)
        };

        $scope.isReviewerOfAnything = function(){
            return ($filter('filter')($scope.submissions, $scope.isReviewerGroup).length > 0)
        };

        // --- Controlling the Tabs ---

        $scope.resetTabs = function(){
            for(var key in $scope.filterData.tabFilter) {
                if($scope.filterData.tabFilter.hasOwnProperty(key)){
                    $scope.filterData.tabFilter[key] = false;
                }
            }
        };

        $scope.showAllSubmissions = function(){
            $scope.resetTabs();
        };

        $scope.showMySubmissions = function(){
            $scope.resetTabs();
            $scope.filterData.tabFilter.isPresenter = true;
        };

        $scope.showMyCoSubmissions = function(){
            $scope.resetTabs();
            $scope.filterData.tabFilter.isCoPresenter = true;
        };

        $scope.showMyAdviserSubmissions = function(){
            $scope.resetTabs();
            $scope.filterData.tabFilter.isAdviser = true;
        };

        $scope.showMyReviewerSubmissions = function(){
            $scope.resetTabs();
            $scope.filterData.tabFilter.isReviewer = true;
        };

        $scope.tabFilters = function(submission){
          if($scope.filterData.tabFilter.isPresenter){
              return $scope.isPresenter(submission);
          }  else if ($scope.filterData.tabFilter.isCoPresenter) {
              return $scope.isCoPresenter(submission);
          } else if ($scope.filterData.tabFilter.isReviewer) {
                  return $scope.reviewGroupFilter(submission);
          } else if ($scope.filterData.tabFilter.isAdviser) {
              return $scope.isAdviser(submission);
          } else {
              console.log("no tab filters applied");
              return true;
          }
        };

        // ----------------------- Getting Data from Mongo ----------------------------
        $scope.statusOptions = {
            editing: false,
            options: [],
            color: [],
            subject: [],
            body: [],
            temp: {strict: "", text: ""}
        };

        $scope.statusGet = function(){
            for(var x = 0; x<$scope.status.length; x++){
                $scope.statusOptions.options.push($scope.status[x].strict);
                $scope.statusOptions.color.push($scope.status[x].color);
                $scope.statusOptions.subject.push($scope.status[x].emailSubject);
                $scope.statusOptions.body.push($scope.status[x].emailBody);
            }
        };


        $http.get('/api/submissions').success(function(submissions) {
            $scope.submissions = submissions;
            socket.syncUpdates('submission', $scope.submissions);
        });

        $http.get('/api/statuss').success(function(status) {
            $scope.status = status;
            $scope.statusGet();
            socket.syncUpdates('status', $scope.status);
        });

        //*******Needs to be updated with new status system******
        var sendGmail = function(opts){
            var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
                '&to=' + opts.to +
                '&su=' + opts.subject +
                '&body=' + opts.message +
                '&ui=1';
            $window.open(str);
        };

        //----------------------------- Color Coding of submission list -----------------------------

        $scope.statusColorTab = function(strict) {
            var index = $scope.statusOptions.options.indexOf(strict);
            if ($scope.statusOptions.color.length == 0 || index == -1) {
                return {'border-left': '4px solid rgba(0, 0, 0, 1)'};
            } else {
            return {'border-left': '4px solid rgba(' + $scope.statusOptions.color[index].red
                                               + ',' + $scope.statusOptions.color[index].green
                                               + ',' + $scope.statusOptions.color[index].blue +
                                                 ',' + $scope.statusOptions.color[index].alpha + ')'}
        }};

        $scope.statusColorBody = function(strict) {
            var index = $scope.statusOptions.options.indexOf(strict);
            if ($scope.statusOptions.color.length == 0 || index == -1) {
                return {'background-color': 'rgba(0, 0, 0, 1)'};
            } else {
                return {'background-color': 'rgba(' + $scope.statusOptions.color[index].red
                                                        + ',' + $scope.statusOptions.color[index].green
                                                        + ',' + $scope.statusOptions.color[index].blue +
                                                          ',' + $scope.statusOptions.color[index].alpha + ')'}
            }};


        // ---------------------- Controlling selection of submission for detail view ---------------------------------

        $scope.selection = {selected: false, item: null};

        $scope.selectItem = function(itemIndex){
            var filteredSubmissions =
                $filter('filter')(
                    $filter('filter')(
                        $filter('filter')(
                            $filter('filter')(
                                $scope.submissions,
                                $scope.hasPermissions
                            ),
                            $scope.tabFilters
                        ),
                        $scope.reviewGroupFilter
                    ),
                    $scope.searchFilter
                );

            $scope.selection.selected = true;
            $scope.selection.item = filteredSubmissions[itemIndex];

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

        // -------------------------- Editing of status ----------------------------------------------
//        $scope.statusOptions = {
//            editing: false,
//            options: ["Reviewing in Process",
//                "Revisions Needed",
//                "Accepted"],
//            subject:"URS submission update",
//            body:[ ", Your URS submission has been approved by your adviser.",
//                ", Your URS submission has been flagged for revisions, and is in need of changes.",
//                ", Your URS submission has been approved, congratulations!"],
//            temp: {strict: "", text: ""}
//        };




        $scope.resetTemps = function() {
            if($scope.selection.item != null){
                $scope.statusOptions.temp.strict = $scope.selection.item.status.strict;
                $scope.statusOptions.temp.text = $scope.selection.item.status.text;
            }
        };

        $scope.resetTemps();

        $scope.editStatus = function(){
            $scope.statusOptions.editing = !$scope.statusOptions.editing;
            $scope.resetTemps();
        };

        $scope.submitStatusEdit = function(){
            $http.patch('api/submissions/' + $scope.selection.item._id,
                {status: {strict: $scope.statusOptions.temp.strict, text: $scope.statusOptions.temp.text}}
            ).success(function(){
                    console.log("Successfully updated status of submission");
            });



            if($scope.selection.item.approval && $scope.statusOptions.temp.strict === "Awaiting Adviser Approval"){
                $http.patch('api/submissions/' + $scope.selection.item._id,
                    {approval: false}
                ).success(function(){
                    $scope.selection.item.approval = false;
                    console.log("Successfully updated approval of submission (un-approved)");
                });
            } else if(!$scope.selection.item.approval && $scope.statusOptions.temp.strict !== "Awaiting Adviser Approval"){
                $http.patch('api/submissions/' + $scope.selection.item._id,
                    {approval: true}
                ).success(function(){
                    $scope.selection.item.approval = true;
                    console.log("Successfully updated approval of submission (approved)");
                });
            }

            $scope.selection.item.status.strict = $scope.statusOptions.temp.strict;
            $scope.selection.item.status.text = $scope.statusOptions.temp.text;

        //--------------------------------------------- gmail stuff? ---------------------------------------

            sendGmail({
                to: $scope.selection.item.presenterInfo.email,
                subject: $scope.statusOptions.subject,
                message: $scope.selection.item.presenterInfo.first +
                    $scope.statusOptions.body[$scope.statusOptions.options.indexOf($scope.selection.item.status.strict)]
            });
            $scope.resetTemps();
            $scope.editStatus();
        };

        $scope.flagForResubmit = function(){
            $http.patch('api/submissions/' + $scope.selection.item._id,
                {resubmissionData: {comment: "flagged for resubmit", parentSubmission: "", resubmitFlag: true}}
            ).success(function(){
                    console.log("Successfully flagged submission for resubmit");
                });
        };

        

        $scope.approvalWordChange = function(approval){
             if(approval){
                 return "Yes";
                 }
             else{
                 return "No";
                 }
             };


        //--------------------------------------------- Tabs Stuff ---------------------------------------



    });