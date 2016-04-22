"use strict";

angular.module("risevision.common.components.tag-selector.services", [
  "risevision.common.gapi"
]);

angular.module("risevision.common.components.tag-selector", [
  "risevision.common.components.tag-selector.services",
  "risevision.common.loading",
  "ui.bootstrap"
])
  .value("companyId", "")
  .value("STORAGE_API_ROOT",
    "https://storage-dot-rvaserver2.appspot.com/_ah/api");
