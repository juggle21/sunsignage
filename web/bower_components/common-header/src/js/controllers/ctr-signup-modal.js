angular.module("risevision.common.header")
  .controller("SignUpModalCtrl", ["$scope", "userState", "uiFlowManager",
    "$loading",
    function ($scope, userState, uiFlowManager, $loading) {

      // Login Modal
      $scope.login = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userState.authenticate(true).then().finally(function () {
          $loading.stopGlobal("auth-buttons-login");
          uiFlowManager.invalidateStatus(endStatus);
        });
      };
    }
  ]);
