'use strict';
angular.module('risevision.storage.services')
  .value('STORAGE_FILE_URL', 'https://storage.googleapis.com/')
  .value('STORAGE_CLIENT_API', 'https://www.googleapis.com/storage/v1/b/')
  .factory('fileSelectorFactory', ['$rootScope', '$window', 'storageFactory',
    'filesFactory', 'userState', 'gadgetsApi', '$loading', 'filterFilter',
    'STORAGE_CLIENT_API', 'STORAGE_FILE_URL',
    function ($rootScope, $window, storageFactory, filesFactory, userState,
      gadgetsApi, $loading, filterFilter,
      STORAGE_CLIENT_API, STORAGE_FILE_URL) {
      var factory = {};

      //on all state Changes do not hold onto checkedFiles list
      $rootScope.$on('$stateChangeStart', function () {
        factory.resetSelections();
      });

      factory.resetSelections = function () {
        filesFactory.filesDetails.files.forEach(function (val) {
          val.isChecked = false;
        });

        filesFactory.filesDetails.checkedCount = 0;
        filesFactory.filesDetails.folderCheckedCount = 0;
        filesFactory.filesDetails.checkedItemsCount = 0;
      };

      factory.folderSelect = function (folder) {
        if (storageFactory.fileIsFolder(folder)) {
          if (storageFactory.isSingleFolderSelector()) {
            _postFileToParent(folder);
          } else if (!storageFactory.isSingleFileSelector() && !
            storageFactory.isMultipleFileSelector()) {
            factory.fileCheckToggled(folder);
          }
        }
      };

      factory.fileCheckToggled = function (file) {
        // ng-click is processed before btn-checkbox updates the model
        var checkValue = !file.isChecked;

        file.isChecked = checkValue;

        if (file.name.substr(-1) !== '/') {
          filesFactory.filesDetails.checkedCount += checkValue ? 1 : -1;
        } else {
          filesFactory.filesDetails.folderCheckedCount += checkValue ? 1 :
            -1;
        }

        filesFactory.filesDetails.checkedItemsCount += checkValue ? 1 : -1;
      };

      factory.selectAllCheckboxes = function (query) {
        var filteredFiles = filterFilter(filesFactory.filesDetails.files,
          query);

        factory.selectAll = !factory.selectAll;

        filesFactory.filesDetails.checkedCount = 0;
        filesFactory.filesDetails.folderCheckedCount = 0;
        filesFactory.filesDetails.checkedItemsCount = 0;
        for (var i = 0; i < filesFactory.filesDetails.files.length; ++i) {
          var file = filesFactory.filesDetails.files[i];

          if (storageFactory.fileIsCurrentFolder(file) ||
            storageFactory.fileIsTrash(file) ||
            (storageFactory.fileIsFolder(file) && !(storageFactory.storageFull ||
              storageFactory.isSingleFolderSelector()))) {
            continue;
          }

          file.isChecked = factory.selectAll && filteredFiles.indexOf(file) >=
            0;

          if (file.name.substr(-1) !== '/') {
            filesFactory.filesDetails.checkedCount += file.isChecked ? 1 :
              0;
          } else {
            filesFactory.filesDetails.folderCheckedCount += file.isChecked ?
              1 : 0;
          }

          filesFactory.filesDetails.checkedItemsCount += file.isChecked ? 1 :
            0;
        }
      };

      var _getFileUrl = function (file) {
        var bucketName = 'risemedialibrary-' + userState.getSelectedCompanyId();
        var folderSelfLinkUrl = STORAGE_CLIENT_API + bucketName +
          '/o?prefix=';
        var fileUrl = file.kind === 'folder' ? folderSelfLinkUrl +
          encodeURIComponent(file.name) :
          STORAGE_FILE_URL + bucketName + '/' + encodeURIComponent(file.name);

        return fileUrl;
      };

      var _getSelectedFiles = function () {
        return filesFactory.filesDetails.files.filter(function (e) {
          return e.isChecked;
        });
      };

      var _sendMessage = function (fileUrls) {
        if (storageFactory.storageIFrame) {
          var data = {
            params: fileUrls
          };

          console.log('Message posted to parent window', fileUrls);
          $window.parent.postMessage(fileUrls, '*');
          gadgetsApi.rpc.call('', 'rscmd_saveSettings', null, data);
        } else {
          $rootScope.$broadcast('FileSelectAction', fileUrls);
        }
      };

      factory.sendFiles = function () {
        var fileUrls = [];

        _getSelectedFiles().forEach(function (file) {
          var copyUrl = _getFileUrl(file);
          fileUrls.push(copyUrl);
        });

        _sendMessage(fileUrls);
      };

      var _postFileToParent = function (file) {
        var fileUrl = _getFileUrl(file);

        _sendMessage([fileUrl]);
      };

      factory.onFileSelect = function (file) {
        if (storageFactory.fileIsFolder(file)) {
          factory.resetSelections();

          if (storageFactory.fileIsCurrentFolder(file)) {
            var folderPath = storageFactory.folderPath.split('/');
            folderPath = folderPath.length > 2 ?
              folderPath.slice(0, -2).join('/') + '/' : '';

            storageFactory.folderPath = folderPath;
          } else {
            storageFactory.folderPath = file.name;
          }

          filesFactory.refreshFilesList();

        } else {
          if (file.isThrottled) {
            file.showThrottledCallout = true;
            // calloutClosingService.add(file);
            return;
          }

          _postFileToParent(file);
        }
      };

      return factory;
    }
  ]);
