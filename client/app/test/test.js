'use strict';

angular.module('umm3601ursamajorApp')

    .config(function ($stateProvider) {
        $stateProvider
            .state('test', {
                url: '/test',
                templateUrl: 'app/test/test.html',
                controller: 'TestCtrl'
            });
    });

angular.module("textAngularTest", ['textAngular']);



$('mybutton').click(function(){
    $('#mytextarea').append('[b][/b]');
});