'use strict';

angular.module('risevision.apps.controllers')
  .controller('AppCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
      $scope.navOptions = [{
        title: 'Home',
        link: $state.href('apps.launcher.home'),
        cid: true,
        states: [
          'apps.launcher.home',
          'apps.launcher.signup',
          'apps.launcher.signin'
        ]
      }, {
        title: '스크린',
        link: $state.href('apps.editor.home'),
        cid: true,
        states: [
          'apps.editor.home',
          'apps.editor.list',
          'apps.editor.workspace.artboard',
          'apps.editor.workspace.htmleditor'
        ]
      }, {
        title: '스케줄',
        link: $state.href('apps.schedules.home'),
        cid: true,
        states: [
          'apps.schedules.home',
          'apps.schedules.list',
          'apps.schedules.details',
          'apps.schedules.add'
        ]
      }, {
        title: '디스플레이',
        link: $state.href('apps.displays.home'),
        cid: true,
        states: [
          'apps.displays.home',
          'apps.displays.list',
          'apps.displays.add',
          'apps.displays.details'
        ]
      }, {
        title: '메시지',
        link: $state.href('apps.displays.alerts'),
        cid: true,
        states: ['apps.displays.alerts']
      }];
      $scope.navSelected = 'apps.launcher.home';
      $scope.hideCH = false;

      $rootScope.$on('$stateChangeSuccess', function () {
        $scope.navSelected = $state.current.name;
        $scope.hideCH = $state.current.name ===
          'apps.launcher.unauthorized' ||
          $state.current.name === 'apps.launcher.unregistered' ||
          $state.current.name === 'apps.launcher.signin' ||
          $state.current.name === 'apps.launcher.signup';
      });
    }
  ]); //ctr
