angular.module("risevision.common.header")
  .controller("RegisterButtonCtrl", ["$scope", "cookieStore", "uiFlowManager",
    function ($scope, cookieStore, uiFlowManager) {

      $scope.register = function () {
        cookieStore.remove("surpressRegistration");
        uiFlowManager.invalidateStatus("registrationComplete");
      };
    }
  ]);
