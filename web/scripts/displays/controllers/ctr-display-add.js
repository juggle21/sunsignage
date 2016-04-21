'use strict';

//updated url parameters to selected display status from status filter
angular.module('risevision.displays.controllers')
  .controller('displayAdd', ['$scope', '$state', 'display', '$loading',
    '$log', 'displayTracker',
    function ($scope, $state, display, $loading, $log, displayTracker) {
      $scope.display = {
        'width': 1920,
        'height': 1080,
        'status': 1,
        'restartEnabled': true,
        'restartTime': '02:00',
        'monitoringEnabled': true,
        'useCompanyAddress': true
      };
      $scope.savingDisplay = false;

      $scope.$watch('savingDisplay', function (loading) {
        if (loading) {
          $loading.start('displays-loader');
        } else {
          $loading.stop('displays-loader');
        }
      });

      $scope.save = function (id, comment, toggleStatus) {
        if (!$scope.displayDetails.$valid) {
          $log.error('form not valid: ', $scope.displayDetails.errors);
          return;
        }

        $scope.savingDisplay = true;

        display.add($scope.display)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              displayTracker('Display Created', resp.item.id, resp.item.name);

              $state.go('apps.displays.details', {
                displayId: resp.item.id
              });
            }
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.savingDisplay = false;
          });
      };

    }
  ]);
