angular.module("risevision.common.header")

.controller("HelpPrioritySupportModalCtrl", [
  "$scope", "$modalInstance", "subscriptionStatus", "supportFactory",
  "SUPPORT_PRODUCT_URL",
  function ($scope, $modalInstance, subscriptionStatus,
    supportFactory, SUPPORT_PRODUCT_URL) {
    $scope.subscriptionStatus = subscriptionStatus;
    $scope.supportProductUrl = SUPPORT_PRODUCT_URL;

    $scope.startTrial = function () {
      supportFactory.initiateTrial().then(function () {
        $scope.dismiss();
      });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

  }
]);
