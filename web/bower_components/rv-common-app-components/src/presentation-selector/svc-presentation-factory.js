"use strict";

angular.module("risevision.common.components.presentation-selector.services")
  .factory("presentationFactory", ["$q", "presentation",
    function ($q, presentation) {
      var factory = {};

      var _presentations = [];
      factory.loadingPresentation = false;
      factory.apiError = "";

      factory.getPresentationCached = function (presentationId) {
        var presentation = _.find(_presentations, {
          id: presentationId
        });

        if (!presentation) {
          presentation = {
            id: presentationId
          };

          _presentations.push(presentation);

          factory.getPresentation(presentationId);
        }

        return presentation;
      };

      var _updatePresentationCache = function (presentation) {
        var cachedPresentation = factory.getPresentationCached(
          presentation.id);

        cachedPresentation.name = presentation.name;
        cachedPresentation.revisionStatus = presentation.revisionStatus;
      };

      factory.getPresentation = function (presentationId) {
        var deferred = $q.defer();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.get(presentationId)
          .then(function (result) {
            _updatePresentationCache(result.item);

            deferred.resolve(result.item);
          })
          .then(null, function (e) {
            factory.apiError = e.message ? e.message : e.toString();

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });

        return deferred.promise;
      };

      return factory;
    }
  ]);
