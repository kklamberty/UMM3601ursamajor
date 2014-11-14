/**
* Created by saxxx027 on 11/10/14.
*/

'use strict';

describe('filter', function() {

    beforeEach(module('umm3601ursamajorApp'));

    describe('isntEmpty', function() {

        it('should return return the title and item ' +
            'if the item is an object with length over 0, empty string or null',
          inject(function(isntEmptyFilter) {
              expect(isntEmptyFilter("item1", "First Item")).toBe("First Item item1");
              expect(isntEmptyFilter(21, "myNumber")).toBe("myNumber 21");
              expect(isntEmptyFilter(["happy", "days", "testing", "rocks"], "arrays")).toBe('arrays happy,days,testing,rocks');
          }));
    });
});