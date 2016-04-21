'use strict';

angular.module('risevision.schedules.services')
  .factory('scheduleFactory', ['$q', '$state', 'schedule', 'scheduleTracker',
    'VIEWER_URL',
    function ($q, $state, schedule, scheduleTracker, VIEWER_URL) {
      var factory = {};
      var _scheduleId;

      var _clearMessages = function () {
        factory.loadingSchedule = false;
        factory.savingSchedule = false;

        factory.errorMessage = '';
        factory.apiError = '';
      };

      var _init = function () {
        _scheduleId = undefined;

        factory.schedule = {
          content: [],
          distributeToAll: false,
          distribution: []
        };

        _clearMessages();
      };

      _init();

      factory.newSchedule = function () {
        scheduleTracker('Add Schedule');

        _init();
      };

      factory.getSchedule = function (scheduleId) {
        var deferred = $q.defer();

        _clearMessages();
        //load the schedule based on the url param
        _scheduleId = scheduleId;

        //show loading spinner
        factory.loadingSchedule = true;

        schedule.get(_scheduleId)
          .then(function (result) {
            factory.schedule = result.item;

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('get', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingSchedule = false;
          });

        return deferred.promise;
      };

      factory.addSchedule = function () {
        _clearMessages();

        //show loading spinner
        factory.loadingSchedule = true;
        factory.savingSchedule = true;

        schedule.add(factory.schedule)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              scheduleTracker('Schedule Created', resp.item.id, resp.item
                .name);

              $state.go('apps.schedules.details', {
                scheduleId: resp.item.id
              });
            }
          })
          .then(null, function (e) {
            _showErrorMessage('add', e);
          })
          .finally(function () {
            factory.loadingSchedule = false;
            factory.savingSchedule = false;
          });
      };

      factory.updateSchedule = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingSchedule = true;
        factory.savingSchedule = true;

        schedule.update(_scheduleId, factory.schedule)
          .then(function (scheduleId) {
            scheduleTracker('Schedule Updated', _scheduleId,
              factory.schedule.name);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('update', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingSchedule = false;
            factory.savingSchedule = false;
          });

        return deferred.promise;
      };

      factory.deleteSchedule = function () {
        _clearMessages();

        //show loading spinner
        factory.loadingSchedule = true;

        schedule.delete(_scheduleId)
          .then(function () {
            scheduleTracker('Schedule Deleted', _scheduleId,
              factory.schedule.name);

            factory.schedule = {};

            $state.go('apps.schedules.list');
          })
          .then(null, function (e) {
            _showErrorMessage('delete', e);
          })
          .finally(function () {
            factory.loadingSchedule = false;
          });
      };

      factory.getPreviewUrl = function () {
        if (_scheduleId) {
          return VIEWER_URL + '/?type=schedule&id=' + _scheduleId +
            '&showui=false';
        }
        return null;
      };

      var _showErrorMessage = function (action, e) {
        factory.errorMessage = 'Failed to ' + action + ' Schedule!';
        factory.apiError = e.result.error.message ? e.result.error.message :
          e.result.error.toString();
      };

      return factory;
    }
  ]);
