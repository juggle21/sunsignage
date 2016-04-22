angular.module("risevision.common.header")
  .controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList", "$loading",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList, $loading) {

      var DB_MAX_COUNT = 40; //number of records to load at a time

      $scope.companies = new BaseList(DB_MAX_COUNT);
      $scope.search = {
        query: ""
      };
      $scope.filterConfig = {
        placeholder: "Search Companies"
      };

      $scope.$watch("loading", function (loading) {
        if (loading) {
          $loading.start("company-selector-modal");
          $loading.start("company-selector-modal-list");
        } else {
          $loading.stop("company-selector-modal");
          $loading.stop("company-selector-modal-list");
        }
      });

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };

      $scope.loadCompanies = function () {
        if (!$scope.companies.endOfList) {
          $scope.loading = true;
          companyService.getCompanies(
            companyId, $scope.search.query,
            $scope.companies.cursor, DB_MAX_COUNT, null).then(function (
            result) {
            if (result && result.items) {
              $scope.companies.add(result.items, result.cursor);
            }
          }).finally(function () {
            $scope.loading = false;
          });
        }
      };

      if ($scope.companies.list.length === 0) {
        $scope.loadCompanies();
      }

      $scope.doSearch = function () {
        $scope.companies.clear();
        $scope.loadCompanies();
      };

      $scope.setCompany = function (company) {
        $modalInstance.close(company.id);
      };

    }
  ]);
