"use strict";

angular.module("risevision.common.components.logging")
  .factory("bigQueryLogging", ["externalLogging", "userState",
    function (externalLogging, userState) {
      var factory = {};

      factory.logEvent = function (eventName, eventDetails, eventValue) {
        return externalLogging.logEvent(eventName, eventDetails, eventValue,
          userState.getUsername(), userState.getSelectedCompanyId());
      };

      return factory;
    }
  ]);
