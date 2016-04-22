"use strict";

angular.module("risevision.common.components.distribution-selector")
  .directive("distributionSelector", ["$modal",
    function ($modal) {
      return {
        restrict: "E",
        scope: {
          distribution: "=",
          distributeToAll: "="
        },
        templateUrl: "distribution-selector/distribution-selector.html",
        link: function ($scope) {
          var _getDistributionSelectionMessage = function () {
            var message = "0 Displays";

            if ($scope.distribution) {
              if ($scope.distribution.length === 1) {
                message = "1 Display";
              } else {
                message = $scope.distribution.length + " Displays";
              }
            }
            return message;
          };

          var _refreshDistributionSelectionMessage = function () {
            $scope.distributionSelectionMessage =
              _getDistributionSelectionMessage();
          };

          $scope.$watchGroup(["distribution", "distributeToAll"], function () {
            if (typeof $scope.distributeToAll === "undefined") {
              $scope.distributeToAll = true;
            }

            if (!$scope.distributeToAll) {
              _refreshDistributionSelectionMessage();
            }
          });

          $scope.manage = function () {

            var modalInstance = $modal.open({
              templateUrl: "distribution-selector/distribution-modal.html",
              controller: "selectDistributionModal",
              size: "lg",
              resolve: {
                distribution: function () {
                  return $scope.distribution;
                }
              }
            });

            modalInstance.result.then(function (distribution) {
              $scope.distribution = distribution;
            });
          };
        } //link()
      };
    }
  ]);
