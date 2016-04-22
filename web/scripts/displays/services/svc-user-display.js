angular.module('risevision.displays.services', [])
  .constant('DISPLAY_WRITABLE_FIELDS', [
    'name', 'status', 'useCompanyAddress', 'addressDescription', 'street',
    'unit', 'city', 'province', 'country', 'postalCode', 'timeZoneOffset',
    'restartEnabled', 'restartTime', 'browserUpgradeMode', 'width', 'height',
    'orientation'
  ])
  .service('userDisplays', ['$http', function ($http) {
    'use strict';

    return {
      get: function () {
        return $http.get('/cms/user/display');
      },

      delete: function (displayId) {
        return $http.delete('/cms/display/' + displayId);
      },

      post: function (todo) {
        return $http.post('/cms/display', todo);
      },

      put: function (todoId, newTodo) {
        return $http.put('/api/todos/' + todoId, newTodo);
      }
    };
  }]);
