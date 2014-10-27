'use strict';

describe('Controller: SubmissionpageCtrl', function () {

  // load the controller's module
  beforeEach(module('umm3601ursamajorApp'));

  var SubmissionpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmissionpageCtrl = $controller('SubmissionpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
