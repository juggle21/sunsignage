angular.module("risevision.common.header")
  .controller("SignOutButtonCtrl", ["$scope", "$modal", "$templateCache",
    "uiFlowManager",
    function ($scope, $modal, $templateCache, uiFlowManager) {
      $scope.logout = function () {
        var modalInstance = $modal.open({
          template: $templateCache.get("signout-modal.html"),
          controller: "SignOutModalCtrl"
        });
        modalInstance.result.finally(function () {
          uiFlowManager.invalidateStatus("registrationComplete");
        });
      };
    }
  ]);
