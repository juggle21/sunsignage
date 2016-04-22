"use strict";

angular.module("risevision.common.components.presentation-selector.services", [
  "risevision.common.gapi",
  "risevision.core.util"
]);

angular.module("risevision.common.components.presentation-selector", [
  "risevision.common.components.presentation-selector.services",
  "risevision.common.components.scrolling-list",
  "risevision.common.loading",
  "ui.bootstrap"
]);
