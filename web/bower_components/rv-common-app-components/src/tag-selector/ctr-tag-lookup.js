"use strict";

//updated url parameters to selected display status from status filter
angular.module("risevision.common.components.tag-selector")
  .controller("tagLookup", ["$scope", "tag", "$modalInstance", "$loading",
    "$log", "tags",
    function ($scope, tag, $modalInstance, $loading, $log, tags) {
      $scope.loadingTags = false;
      $scope.selectedTags = tags ? tags : [];

      $scope.$watch("loadingTags", function (loading) {
        if (loading) {
          $loading.start("tag-loader");
        } else {
          $loading.stop("tag-loader");
        }
      });

      var _init = function () {
        $scope.loadingTags = true;

        tag.flatList()
          .then(function (tagList) {
            $scope.availableTags = tagList;
          })
          .then(null, function (e) {
            $log.error("Could not load tags: ", e);
          }).finally(function () {
            $scope.loadingTags = false;
          });
      };

      _init();

      $scope.selectTag = function (tag) {
        $scope.selectedTags.push(tag);
      };

      $scope.removeTag = function (index) {
        //remove from array
        if (index > -1) {
          $scope.selectedTags.splice(index, 1);
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };

      $scope.apply = function () {
        $modalInstance.close($scope.selectedTags);
      };

    }
  ]);
