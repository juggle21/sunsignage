'use strict';
angular.module('risevision.editor.controllers')
  .controller('PresentationListController', ['$scope',
    'ScrollingListService', 'presentation', 'editorFactory', '$loading',
    '$filter', 'userState',
    function ($scope, ScrollingListService, presentation, editorFactory,
      $loading, $filter, userState) {

      $scope.search = {
        sortBy: 'changeDate',
        reverse: true
      };

      console.log('presentation.list---->', presentation.list);

      $scope.factory = new ScrollingListService(presentation.list, $scope.search);
      $scope.editorFactory = editorFactory;

      $scope.filterConfig = {
        placeholder: $filter('translate')(
          'editor-app.list.filter.placeholder'),
        id: 'presentationSearchInput'
      };

      $scope.$watch('factory.loadingItems', function (loading) {
        if (loading) {
          $loading.start('presentation-list-loader');
        } else {
          $loading.stop('presentation-list-loader');
        }
      });
    }
  ]);
