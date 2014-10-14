'use strict';

angular.module('umm3601ursamajorApp')
  .controller('SubformCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

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
        copresenterOneInfo: {first: "", last: "", email: ""},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "",
        sponsors: ["","","","",""], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "", email: ""},
        featuredPresentation: Boolean,
        mediaServicesEquipment: "",
        specialRequirements: "",
        presenterTeeSize: "",
        otherInfo: ""
    };

    $scope.submitSubmission = function(){
        $http.post('api/submissions/',
            {
            title: $submissionData.title,
            format: $submissionData.format,
            abstract: $submissionData.abstract,
            presentationType: $submissionData.presentationType,
            formatChange: $submissionData.formatChange,
            presenterInfo: {first: $submissionData.presenterInfo.first, last: $submissionData.presenterInfo.last, email: $submissionData.presenterInfo.last},
            copresenterOneInfo: {first: $submissionData.copresenterOneInfo.first, $last: $submissionData.copresenterOneInfo.last, email: $submissionData.copresenterOneInfo.email},
            copresenterTwoInfo: {first: $submissionData.copresenterTwoInfo.first, $last: $submissionData.copresenterTwoInfo.last, email: $submissionData.copresenterTwoInfo.email},
            discipline: $submissionData.discipline,
            sponsors: $submissionData.sponsors,
            adviserInfo: {name: $submissionData.adviserInfo.name, email: $submissionData.adviserInfo.email},
            featrued: $submissionInfo.featuredPresentation,
            mediaServicesEquipment: $submissionData.mediaServicesEquipment,
            specialRequirements: $submissionData.specialRequirements,
            presenterTeeSize: $submissionData.presenterTeeSize,
            otherInfo: $submissionData.otherInfo,
            approval: false,
            status: "pending approval"
            }
        );
        $scope.resetData();
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
            adviserInfo: {name: "", email: ""},
            featuredPresentation: Boolean,
            mediaServicesEquipment: "",
            specialRequirements: "",
            presenterTeeSize: "",
            otherInfo: ""
        };
    };

  });
