angular.module("risevision.common.header")

.controller("SystemMessagesButtonCtrl", [
  "$scope", "userState", "$log", "$sce", "getCoreSystemMessages",
  "systemMessages",
  function ($scope, userState, $log, $sce, getCoreSystemMessages,
    systemMessages) {

    $scope.messages = systemMessages;
    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (isRvUser) {
        $scope.isRiseVisionUser = isRvUser;
      });

    $scope.renderHtml = function (html_code) {
      return $sce.trustAsHtml(html_code);
    };

    //register core message retriever
    systemMessages.registerRetriever(function () {
      return getCoreSystemMessages(userState.getSelectedCompanyId());
    });

    $scope.$watch(
      function () {
        return userState.getSelectedCompanyId();
      },
      function (newCompanyId) {
        if (newCompanyId !== null) {
          systemMessages.resetAndGetMessages().then($scope.apply);
        } else {
          systemMessages.clear();
        }
      });

  }
]);
