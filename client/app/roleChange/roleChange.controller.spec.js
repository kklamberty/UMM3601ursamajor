'use strict';

describe('Controller: RoleChangeCtrl', function () {

    // load the controller's module
    beforeEach( module('umm3601ursamajorApp', function($provide) {
        var userMock, userStub;
        userStub = {
            query: function() {return 'blah'}
        };
        userMock = function() {
            this.$get = function() {
                return userStub;
            }
        };
        $provide.provider('User', userMock);
    }));

    // Initialize the controller and a mock scope
    describe('the controller initialization', function() {
        var RoleChangeCtrl, scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            RoleChangeCtrl = $controller('RoleChangeCtrl', {
                $scope: scope
            });
        }));

        describe('scope.users', function() {
            it('should be a string blah', function() {
                expect(scope.users).toEqual('blah');
            });
        })
    })

});