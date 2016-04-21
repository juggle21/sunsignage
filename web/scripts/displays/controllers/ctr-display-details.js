'use strict';

//updated url parameters to selected display status from status filter
angular.module('risevision.displays.controllers')
  .controller('displayDetails', ['$scope', '$q', '$state', '$stateParams',
    'display', '$loading', '$modal', '$log', '$templateCache',
    'displayTracker',
    function ($scope, $q, $state, $stateParams, display,
      $loading, $modal, $log, $templateCache, displayTracker) {
      $scope.displayId = $stateParams.displayId;
      $scope.savingDisplay = false;
      $scope.displayTracker = displayTracker;

      $scope.$watch('loadingDisplay', function (loading) {
        if (loading) {
          $loading.start('display-loader');
        } else {
          $loading.stop('display-loader');
        }
      });

      $scope.$watch('displayId', function (displayId) {
        if (displayId) {
          _getDisplay();
        }
      });

      var _getDisplay = function () {
        //load the display based on the url param
        $scope.loadingDisplay = true;

        display.get($scope.displayId)
          .then(function (result) {
            $scope.display = result.item;
            if ($scope.display) {
              $scope.showBrowserUpgradeMode = $scope.display.browserUpgradeMode !==
                0;
            }
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      var _delete = function () {
        //show loading spinner
        $scope.loadingDisplay = true;

        display.delete($scope.displayId)
          .then(function (result) {
            displayTracker('Display Deleted', $scope.displayId,
              $scope.display.name);

            $scope.display = result.item;

            $state.go('apps.displays.list');
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      $scope.confirmDelete = function () {
        $scope.modalInstance = $modal.open({
          template: $templateCache.get(
            'confirm-instance/confirm-modal.html'),
          controller: 'confirmInstance',
          windowClass: 'modal-custom',
          resolve: {
            confirmationTitle: function () {
              return 'displays-app.details.deleteTitle';
            },
            confirmationMessage: function () {
              return 'displays-app.details.deleteWarning';
            },
            confirmationButton: function () {
              return 'common.delete-forever';
            },
            cancelButton: null
          }
        });

        $scope.modalInstance.result.then(function () {
          // do what you need if user presses ok
          _delete();
        }, function () {
          // do what you need to do if user cancels
        });
      };

      $scope.addDisplay = function () {
        if (!$scope.displayDetails.$dirty) {
          $state.go('apps.displays.add');
        } else {
          $scope.modalInstance = $modal.open({
            template: $templateCache.get(
              'confirm-instance/confirm-modal.html'),
            controller: 'confirmInstance',
            windowClass: 'modal-custom',
            resolve: {
              confirmationTitle: function () {
                return 'displays-app.details.unsavedTitle';
              },
              confirmationMessage: function () {
                return 'displays-app.details.unsavedWarning';
              },
              confirmationButton: function () {
                return 'common.save';
              },
              cancelButton: function () {
                return 'common.discard';
              }
            }
          });

          $scope.modalInstance.result.then(function () {
            // do what you need if user presses ok
            $scope.save()
              .then(function () {
                $state.go('apps.displays.add');
              });
          }, function (value) {
            // do what you need to do if user cancels
            if (value) {
              $state.go('apps.displays.add');
            }
          });
        }
      };

      $scope.save = function () {
        var deferred = $q.defer();

        if (!$scope.displayDetails.$valid) {
          $log.error('form not valid: ', $scope.displayDetails.errors);
          deferred.reject();
        } else {
          $scope.savingDisplay = true;

          display.update($scope.displayId, $scope.display)
            .then(function (displayId) {
              displayTracker('Display Updated', $scope.displayId,
                $scope.display.name);

              deferred.resolve();
            })
            .then(null, function (e) {
              $scope.submitError = e.message ? e.message : e.toString();

              deferred.reject();
            })
            .finally(function () {
              $scope.savingDisplay = false;
            });
        }

        return deferred.promise;
      };

      $scope.$watch('display.browserUpgradeMode', function () {
        if ($scope.display && $scope.display.browserUpgradeMode !== 0) {
          $scope.display.browserUpgradeMode = 1;
        }
      });
    }
  ]);
