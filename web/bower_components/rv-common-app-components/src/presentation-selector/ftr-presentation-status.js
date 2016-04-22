"use strict";

// Revision Status Filter
angular.module("risevision.common.components.presentation-selector")
  .filter("presentationStatus", ["translateFilter",
    function (translateFilter) {
      return function (revisionStatusName) {
        if (revisionStatusName === "Published") {
          return translateFilter(
            "schedules-app.presentation-modal.presentation-list.status.published"
          );
        } else if (revisionStatusName === "Revised") {
          return translateFilter(
            "schedules-app.presentation-modal.presentation-list.status.revised"
          );
        } else {
          return "N/A";
        }
      };
    }
  ]);
