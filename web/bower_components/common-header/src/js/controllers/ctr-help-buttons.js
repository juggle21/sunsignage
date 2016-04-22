angular.module("risevision.common.header")

.controller("HelpDropdownButtonCtrl", ["$scope", "supportFactory", "userState",
  function ($scope, supportFactory, userState) {

    $scope.$watch(function () {
        return userState.isLoggedIn();
      },
      function (loggedIn) {
        $scope.isLoggedIn = loggedIn;

      });

    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (riseVisionUser) {
        $scope.isRiseVisionUser = riseVisionUser;

      });

    $scope.openPrioritySupport = function () {
      supportFactory.handlePrioritySupportAction();
    };

    $scope.openSendUsANote = function () {
      supportFactory.handleSendUsANote();
    };
  }
]);
