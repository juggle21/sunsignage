angular.module("risevision.common.header.directives")
  .directive("integerParser", [

    function () {
      return {
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
          ctrl.$parsers.unshift(function (viewValue) {
            return parseInt(viewValue, 10) || 0;
          });
        }
      };
    }
  ]);
