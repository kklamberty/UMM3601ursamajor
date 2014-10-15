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
            } else if (item !== "" || item !== null){
                return title + " " + item;
            }
        }
    })

    .controller('SublistCtrl', function ($scope, $http) {

        $scope.submissions = [];

        $http.get('/api/submissions').success(function(submissions) {
            $scope.submissions = submissions;
        });


    });