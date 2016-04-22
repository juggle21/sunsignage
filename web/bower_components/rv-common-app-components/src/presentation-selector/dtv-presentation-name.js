"use strict";

angular.module("risevision.common.components.presentation-selector")
  .directive("presentationName", ["presentationFactory",
    function (presentationFactory) {
      return {
        restrict: "A",
        scope: {
          id: "=presentationName"
        },
        link: function ($scope, element) {
          $scope.$watch("id", function (id) {
            if (id) {
              $scope.presentation = presentationFactory.getPresentationCached(
                $scope.id);
            }
          });

          $scope.$watch("presentation.name", function (name) {
            if (name) {
              element.html(name);
            }
          });
        } //link()
      };
    }
  ]);
