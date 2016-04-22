"use strict";

angular.module("risevision.common.components.tag-selector")
  .directive("tagTextbox", ["$modal",
    function ($modal) {
      return {
        restrict: "E",
        scope: {
          tags: "="
        },
        templateUrl: "tag-selector/tag-textbox.html",
        link: function ($scope) {
          $scope.openModal = function () {
            var modalInstance = $modal.open({
              templateUrl: "tag-selector/tag-lookup-modal.html",
              controller: "tagLookup",
              resolve: {
                tags: function () {
                  return angular.copy($scope.tags);
                }
              }
            });

            modalInstance.result.then(function (tags) {
              //do what you need if user presses ok
              $scope.tags = tags;
            }, function () {
              // do what you need to do if user cancels
            });
          };

        } //link()
      };
    }
  ]);
