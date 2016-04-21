'use strict';

angular.module('risevision.apps.launcher.controllers')
  .controller('HomeCtrl', ['$scope', 'launcherTracker', 'editorFactory',
    function ($scope, launcherTracker, editorFactory) {
      $scope.launcherTracker = launcherTracker;
      $scope.editorFactory = editorFactory;
    }
  ]); //ctr
