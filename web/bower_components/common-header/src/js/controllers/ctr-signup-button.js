angular.module("risevision.common.header")
  .controller("SignUpButtonCtrl", ["$scope", "$modal",
    function ($scope, $modal) {

      $scope.openSignUpModal = function () {
        $modal.open({
          templateUrl: "signup-modal.html",
          controller: "SignUpModalCtrl"
        });
      };
    }
  ]);
