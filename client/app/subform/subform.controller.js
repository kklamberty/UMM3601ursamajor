'use strict';

angular.module('umm3601ursamajorApp')

  .controller('SubformCtrl', function ($scope, $http, Auth, $location, socket, $filter) {

    if(Auth.isLoggedIn() === false) {
        $location.path('/');
    }

    $scope.isAdmin = Auth.isAdmin;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.timestamp = Date();

    $scope.submissions = [];
    $scope.flaggedSubmissions = [];
    $scope.resubmitParent = null;

    $scope.updateFlaggedSubmissions = function(subs){
        $scope.flaggedSubmissions = $filter('filter')(subs, function(sub){return (sub.resubmissionData.resubmitFlag && (Auth.getCurrentUser().email === sub.presenterInfo.email))});
    };

    $http.get('/api/submissions').success(function(submissions) {
        $scope.submissions = submissions;
        $scope.updateFlaggedSubmissions(submissions);
        socket.syncUpdates('submission', $scope.submissions);
    });

    $scope.hasResubmitFlags = function(){
        return $scope.flaggedSubmissions.length > 0;
    };

    $scope.isResubmitting = false;

    $scope.formatOptions =
        ['Artist Statement',
         'Humanities Proposal',
         'Science or Social Science Abstract'
        ];

    $scope.presentationTypes =
        ['Poster or visual display',
         'Oral presentation',
         'Performance'
        ];

    $scope.fundingSources = [
        'UROP',
        'MAP',
        'MMP',
        'LSAMP'
    ];

    $scope.numberOfSources = $scope.fundingSources.length;

    $scope.teeSizes = [
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        'XXXL'
    ];

    $scope.submissionData = {
        title: "",
        format: "",
        abstract: "",
        presentationType: "",
        formatChange: Boolean,
        presenterInfo: {first: "", last: "", email: ""},
        copresenterOne: {first: "", last: "", email: ""},
        copresenterTwo: {first: "", last: "", email: ""},
        discipline: "",
        sponsors: [],
        sponsorsFinal: [],
        adviserInfo: {first: "", last: "", email: ""},
        featuredPresentation: Boolean,
        mediaServicesEquipment: "",
        specialRequirements: "",
        presenterTeeSize: "",
        otherInfo: "",
        resubmitComment: "",
        resubmitParent: "",
        resubmitFlag: false
    };

    $scope.getResubmitData = function(submission){
        $scope.submissionData = {
            title: submission.title,
            format: submission.format,
            abstract: submission.abstract,
            presentationType: submission.presentationType,
            formatChange: submission.formatChange,
            presenterInfo: {first: submission.presenterInfo.first, last: submission.presenterInfo.last, email: submission.presenterInfo.email},
            copresenterOne: {first: submission.copresenterOneInfo.first, last: submission.copresenterOneInfo.last, email: submission.copresenterOneInfo.email},
            copresenterTwo: {first: submission.copresenterTwoInfo.first, last: submission.copresenterTwoInfo.last, email: submission.copresenterTwoInfo.email},
            discipline: submission.discipline,
            sponsors: submission.sponsors,
            sponsorsFinal: [],
            adviserInfo: {first: submission.adviserInfo.first, last: submission.adviserInfo.last, email: submission.adviserInfo.email},
            featuredPresentation: submission.featured,
            mediaServicesEquipment: submission.mediaServicesEquipment,
            specialRequirements: submission.specialRequirements,
            presenterTeeSize: submission.presenterTeeSize,
            otherInfo: submission.otherInfo,
            resubmitComment: "",
            resubmitParent: submission._id,
            resubmitFlag: false
        };

        $scope.isResubmitting = true;
        $scope.resubmitParent = submission;
    };

    $scope.submissionTextArray = [];
    $scope.submissionText = {};

    $http.get('/api/subformtexts').success(function(submissionTextArray) {
        $scope.submissionTextArray = submissionTextArray;
        $scope.submissionText = $scope.submissionTextArray[0];
    });

    $scope.submitSubmission = function(){

        var r = confirm("Are you sure you want to submit?");
        if (r == true) {
            for (var i = 0; i < $scope.submissionData.sponsors.length; i++) {
                if ($scope.submissionData.sponsors[i] != "" && $scope.submissionData.sponsors[i] != null) {
                    $scope.submissionData.sponsorsFinal.push($scope.submissionData.sponsors[i]);
                }

            }

            console.log('posting Data!');

            $http.post('/api/submissions/',
                {
                    title: $scope.submissionData.title,
                    format: $scope.submissionData.format,
                    abstract: $scope.submissionData.abstract,
                    presentationType: $scope.submissionData.presentationType,
                    formatChange: $scope.submissionData.formatChange,
                    presenterInfo: {first: $scope.submissionData.presenterInfo.first, last: $scope.submissionData.presenterInfo.last, email: $scope.submissionData.presenterInfo.email},
                    copresenterOneInfo: {first: $scope.submissionData.copresenterOne.first, last: $scope.submissionData.copresenterOne.last, email: $scope.submissionData.copresenterOne.email},
                    copresenterTwoInfo: {first: $scope.submissionData.copresenterTwo.first, last: $scope.submissionData.copresenterTwo.last, email: $scope.submissionData.copresenterTwo.email},
                    discipline: $scope.submissionData.discipline,
                    sponsors: $scope.submissionData.sponsorsFinal,
                    adviserInfo: {first: $scope.submissionData.adviserInfo.first, last: $scope.submissionData.adviserInfo.last, email: $scope.submissionData.adviserInfo.email},
                    featured: $scope.submissionData.featuredPresentation,
                    mediaServicesEquipment: $scope.submissionData.mediaServicesEquipment,
                    specialRequirements: $scope.submissionData.specialRequirements,
                    presenterTeeSize: $scope.submissionData.presenterTeeSize,
                    otherInfo: $scope.submissionData.otherInfo,
                    approval: false,
                    status: {strict: "Awaiting Adviser Approval", text: "Adviser has not been notified"},
                    timestamp: $scope.timestamp,
                    group: 0,
                    resubmissionData: {comment: $scope.submissionData.resubmitComment, parentSubmission: $scope.submissionData.resubmitParent, resubmitFlag: $scope.submissionData.resubmitFlag }
                }
            );

            if ($scope.isResubmitting) {
                $http.patch('api/submissions/' + $scope.submissionData.resubmitParent,
                    // This is only setting false right now. comment and submission donot get stored.
                    {resubmissionData: {comment: $scope.resubmitParent.resubmissionData.comment, parentSubmission: $scope.resubmitParent.resubmissionData.parentSubmission, resubmitFlag: false}}
                ).success(function(){
                    console.log("Successfully unflagged the original submission for resbumission.");
                });
            }

            $scope.resetData();
            $location.path('/submissionpage');
        }
    };

    $scope.charsRemaining = function() {
        return 1000 - $scope.submissionData.abstract.length;
    };

    $scope.resetData = function(){
        $scope.submissionData = {
            title: "",
            format: "",
            abstract: "",
            presentationType: "",
            formatChange: Boolean,
            presenterInfo: {first: "", last: "", email: ""},
            copresenterOne: {first: "", last: "", email: ""},
            copresenterTwo: {first: "", last: "", email: ""},
            discipline: "",
            sponsors: ["","","","",""], //Might need to worry about if this is static for the DB later.
            adviserInfo: {first: "", last: "", email: ""},
            featuredPresentation: Boolean,
            mediaServicesEquipment: "",
            specialRequirements: "",
            presenterTeeSize: "",
            otherInfo: ""
        };
    };

  });
