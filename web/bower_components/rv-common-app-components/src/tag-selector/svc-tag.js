"use strict";

angular.module("risevision.common.components.tag-selector.services")
  .service("tag", ["$q", "userState", "storageApiLoader", "$log",
    function ($q, userState, storageApiLoader, $log) {
      var LOOKUP_TYPE = "LOOKUP";
      var service = {};

      var _flattenTagList = function (tags) {
        var res = [];
        for (var i = 0; i < tags.length; i++) {
          var tag = tags[i];

          if (tag.type === LOOKUP_TYPE) {
            for (var j = 0; j < tag.values.length; j++) {
              res.push({
                name: tag.name,
                value: tag.values[j]
              });
            }
          }
        }
        return res;
      };

      service.flatList = function () {
        var deferred = $q.defer();

        service.list()
          .then(function (resp) {
            return _flattenTagList(resp.items);
          })
          .then(function (result) {
            deferred.resolve(result);
          })
          .then(null, function (e) {
            deferred.reject(e);
          });

        return deferred.promise;
      };

      service.list = function () {
        var deferred = $q.defer();
        var obj = {
          companyId: userState.getSelectedCompanyId()
        };

        storageApiLoader().then(function (storageApi) {
          return storageApi.tagdef.list(obj);
        })
          .then(function (resp) {
            $log.debug("get tag list resp", resp);
            deferred.resolve(resp.result);
          })
          .then(null, function (e) {
            $log.error("Failed to get tags list.", e);
            deferred.reject(e);
          });

        return deferred.promise;
      };

      return service;
    }
  ]);
