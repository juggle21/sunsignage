"use strict";

//load the google api client lib for the storage api
angular.module("risevision.common.components.tag-selector.services")
  .factory("storageApiLoader", ["STORAGE_API_ROOT", "gapiClientLoaderGenerator",
    function (STORAGE_API_ROOT, gapiClientLoaderGenerator) {
      return gapiClientLoaderGenerator("storage", "v0.01", STORAGE_API_ROOT);
    }
  ])
  .value("STORAGE_API_ROOT",
    "https://storage-dot-rvaserver2.appspot.com/_ah/api");
