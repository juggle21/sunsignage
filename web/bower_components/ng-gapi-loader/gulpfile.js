var
    gulp = require("gulp"),
    factory = require("widget-tester").gulpTaskFactory;

var unitTestFiles = [
  "components/angular/angular.js",
  "components/q/q.js",
  "components/angular-mocks/angular-mocks.js",
  "src/js/*.js",
  "test/gapi-mock.js",
  "test/unit/*spec.js"
  ];

gulp.task("test:unit", factory.testUnitAngular({testFiles: unitTestFiles}));
gulp.task("test:unit-watch", factory.testUnitAngular({testFiles: unitTestFiles, watch: true}));
gulp.task("test", ["test:unit"]);
