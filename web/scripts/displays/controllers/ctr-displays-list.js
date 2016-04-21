'use strict';

angular.module('risevision.displays.controllers')
  .controller('displaysList', ['$scope', 'userState', 'display', 'BaseList',
    '$location', '$loading', '$filter', 'displayTracker',
    function ($scope, userState, display, BaseList, $location, $loading,
      $filter, displayTracker) {
      var DB_MAX_COUNT = 40; //number of records to load at a time

      $scope.displays = new BaseList(DB_MAX_COUNT);
      $scope.selectedCompayId = userState.getSelectedCompanyId();
      $scope.displayTracker = displayTracker;

      $scope.search = angular.extend({
        sortBy: 'name',
        count: DB_MAX_COUNT,
        reverse: false,
      }, $location.search());

      $scope.filterConfig = {
        placeholder: $filter('translate')(
          'displays-app.list.filter.placeholder')
      };

      $scope.$watch('loadingDisplays', function (loading) {
        if (loading) {
          $loading.start('displays-list-loader');
        } else {
          $loading.stop('displays-list-loader');
        }
      });

      $scope.load = function () {
        if (!$scope.displays.list.length || !$scope.displays.endOfList &&
          $scope.displays.cursor) {
          $scope.loadingDisplays = true;

          display.list($scope.search, $scope.displays.cursor)
            .then(function (result) {
              $scope.displays.add(result.items ? result.items : [],
                result.cursor);
            })
            .then(null, function (e) {
              $scope.error =
                'Failed to load displays. Please try again later.';
            })
            .finally(function () {
              $scope.loadingDisplays = false;
            });
        }
      };

      $scope.load();

      $scope.sortBy = function (cat) {
        $scope.displays.clear();

        if (cat !== $scope.search.sortBy) {
          $scope.search.sortBy = cat;
        } else {
          $scope.search.reverse = !$scope.search.reverse;
        }

        $scope.load();
      };

      $scope.doSearch = function () {
        $scope.displays.clear();

        $scope.load();
      };

    }
  ]);
