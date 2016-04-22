'use strict';
/* global angular */

angular.module('risevision.common.svg', ['risevision.common.svg.icons'])
  .directive('svgIcon', ['iconsList', function(iconsList) {
    function link(scope, element, attrs) {
      function path(icon) {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' + 
        '<path d="' + iconsList.icons1[icon] + '"/>' + 
        '<path d="' + iconsList.icons2[icon] + '"/>' +
        '</svg>';
      }

      function renderSVG() {
        element.html( path(attrs.p) );
      }
      
      renderSVG();
    }

    return {
      link: link,
      restrict: 'E'
    };
  }]);
