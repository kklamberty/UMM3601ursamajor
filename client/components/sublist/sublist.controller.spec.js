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
});