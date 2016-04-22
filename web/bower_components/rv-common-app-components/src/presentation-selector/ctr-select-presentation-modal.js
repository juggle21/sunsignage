"use strict";

angular.module("risevision.common.components.presentation-selector")
  .controller("selectPresentationModal", ["$scope", "$modalInstance",
    function ($scope, $modalInstance) {
      $scope.$on(
        "risevision.common.components.presentation-selector.presentation-selected",
        function (event, presentationId, presentationName) {
          $modalInstance.close([presentationId, presentationName]);
        }
      );

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);
