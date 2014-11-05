'use strict';

angular.module('umm3601ursamajorApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
        changeRole: {
            method: 'PUT',
            params: {
//        controller:'role'
            }
        },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
