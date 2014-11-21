/**
* Created by saxxx027 on 11/10/14.
*/

'use strict';

describe('filter', function() {
    beforeEach(module('umm3601ursamajorApp'));

    describe('isntEmpty', function() {
        it('should return return the title and item ' +
            'if the item is an object with length over 0, not ' +
                'an object, but not "" or null, else altTitle',
          inject(function(isntEmptyFilter) {
              expect(isntEmptyFilter("item1", "First Item", "something else")).toBe("First Item item1");
              expect(isntEmptyFilter(21, "myNumber", "something else")).toBe("myNumber 21");
              expect(isntEmptyFilter(["happy", "days", "testing", "rocks"], "arrays", "something else")).toBe('arrays happy,days,testing,rocks');
              expect(isntEmptyFilter("", "something else", "this was an empty string")).toBe("this was an empty string");
          }));
    });


    describe('fancyLimitTo', function() {
        it('should return first "n" characters of the imputed text',
            inject(function(fancyLimitToFilter){
                expect(fancyLimitToFilter("abc", 1 )).toBe("a[...]");
                expect(fancyLimitToFilter("12345", 0)).toBe("[...]");
                expect(fancyLimitToFilter("", 5)).toBe("[...]");
            }));
    });
});

// TODO: this test isn't finished, just a template as of now. FINISH IT AND WRITE MORE TESTS!!!
describe('Functions used for filtering', function() {
    beforeEach(module('umm3601ursamajorApp', function ($provide) {
        var submissionMock, submissionStub;
        submissionStub = {
            title: "A Study of the Properties of a Paperclip in the Digestive System of a Sloth",
            format: "Artist Statement",
            abstract: "Many physicists would agree that, had it not been for scatter/gather I/O, the study of link-level acknowledgements might never have occurred. " +
                "While such a claim might seem unexpected, it usually conflicts with the need to provide thin clients to hackers worldwide. " +
                "In fact, few security experts would disagree with the construction of kernels. In order to overcome this question, we construct an analysis of the Ethernet (Mollah)," +
                " which we use to prove that redundancy and replication can interfere to achieve this aim. ",
            presentationType: "Oral Presentation",
            formatChange: false,
            presenterInfo: {first: "Hongya", last: "Zhou", email: "zhoux616@morris.umn.edu"},
            copresenterOneInfo: {first: "Otto", last: "Marckel II", email: "marck018@morris.umn.edu"},
            copresenterTwoInfo: {first: "Dalton", last: "Gusaas", email: "gusaa004@morris.umn.edu"},
            discipline: "Biology",
            sponsors: [], //Might need to worry about if this is static for the DB later.
            adviserInfo: {first: "Maggie", last: "Casale", email: "casal033@morris.umn.edu"},
            featured: false,
            mediaServicesEquipment: "",
            specialRequirements: "a sloth",
            presenterTeeSize: "M",
            otherInfo: "Maybe",
            approval: false,
            status: {strict: "Awaiting Adviser Approval", text: "Your adviser has yet to approve this submission."},
            timestamp: "Mon Oct 20 2014 1:48:54 GMT-0500 (CDT)",
            group: 3,
            resubmissionData: {comment: "Initial Submission", parentSubmission: "testIdForTesting", isPrimary: false, resubmitFlag: false},
            comments: []
        };

        submissionMock = function () {
            this.$get = function () {
                return submissionStub;
            }
        };
        $provide.provider('submission', submissionMock);
    }));

    describe('the controller initialization', function () {
        var SublistCtrl, scope, socket;
        beforeEach(inject(function ($controller, $rootScope, _socket_) {
            scope = $rootScope.$new();
            socket = _socket_;
            SublistCtrl = $controller('SublistCtrl', {
                $scope: scope
            });
        }));

        describe('checking if a submission is a resubmission', function () {
            //this is broken. it's all broken. Apparently it cannot find "io"....
            it('Should be a resubmission... ', function ($scope) {
                expect(scope.isResubmission(submissionMock)).toEqual(true);
            });
        })
    })
});