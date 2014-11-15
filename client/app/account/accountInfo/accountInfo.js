'use strict';

angular.module('umm3601ursamajorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('accountInfo', {
                url: '/accountInfo',
                templateUrl: 'app/account/accountInfo/accountInfo.html',
                controller: 'AccountinfoCtrl'
            });
    });