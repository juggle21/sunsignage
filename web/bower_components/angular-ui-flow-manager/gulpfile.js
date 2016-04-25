
/*jshint node: true */

var
    gulp = require("gulp"),
    factory = require("widget-tester").gulpTaskFactory,
    runSequence = require("run-sequence"),
    jshint = require("gulp-jshint");

var unitTestFiles = [
  "components/angular/angular.js",
  "components/q/q.js",
  "components/angular-mocks/angular-mocks.js",
  "components/ng-gapi-loader/src/js/*.js",
  "components/angular-local-storage/dist/angular-local-storage.js",
  "src/js/*.js",
  "test/gapi-mock.js",
  "test/unit/fixtures/*.js",
  "test/unit/*spec.js"
  ];

gulp.task("test:unit", factory.testUnitAngular({testFiles: unitTestFiles}));
gulp.task("test:unit-watch", factory.testUnitAngular({testFiles: unitTestFiles, watch: true}));
gulp.task("metrics", factory.metrics());

gulp.task("lint", function() {
  return gulp.src([
      "src/js/**/*.js",
      "test/**/*.js"
    ])
    .pipe(jshint())
    .on("error", function () {
      process.exit(1);
    });
});

gulp.task("test", ["lint"], function (cb) {
  runSequence("test:unit", "metrics", cb);
});
