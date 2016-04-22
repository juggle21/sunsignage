angular.module("risevision.common.header")

.filter("surpressZero", function () {
  return function (num) {
    if (num) {
      return num;
    } else {
      return "";
    }
  };
})

.controller("ShoppingCartButtonCtrl", [
  "$scope", "shoppingCart", "userState", "$log", "STORE_URL",
  function ($scope, shoppingCart, userState, $log, STORE_URL) {

    $scope.shoppingCartUrl = STORE_URL + "shopping-cart";
    $scope.cart = {};
    $scope.cart.items = shoppingCart.getItems();
    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (isRvUser) {
        $scope.isRiseVisionUser = isRvUser;
        shoppingCart.get();
      });

  }
]);
