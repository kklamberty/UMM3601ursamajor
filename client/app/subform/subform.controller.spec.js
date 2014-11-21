'use strict';

describe('Controller: SubformCtrl', function () {

  // load the controller's module
  beforeEach(module('umm3601ursamajorApp'));

  var SubformCtrl, scope, socket;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _socket_) {
    scope = $rootScope.$new();
    socket = _socket_;
    SubformCtrl = $controller('SubformCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
