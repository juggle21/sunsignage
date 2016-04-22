"use strict";

/*jshint node: true */
/* global concat: true */

// ************************
// * Rise Vision Store UI *
// * build script         *
// ************************

// Include gulp

var gulp = require("gulp"),
    // Include Our Plugins
    jshint = require("gulp-jshint"),
    factory = require("widget-tester").gulpTaskFactory,
    //Test files
    testFiles = [
      "components/q/q.js",
      "components/angular/angular.js",
      "components/angular-mocks/angular-mocks.js",
      "components/angular-spinner/angular-spinner.js",
      "components/spin.js/spin.js",
      "loading.js",
      "tests.js"
    ],

    filesToLint  = [
      "loading.js",
      "tests.js"
    ];

gulp.task("lint", function() {
  return gulp.src(filesToLint)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"))
    .on("error", function () {
      process.exit(1);
    });
});


gulp.task("test:unit", ["lint"], factory.testUnitAngular({testFiles: testFiles}));
gulp.task("test", ["test:unit"]);

gulp.task("default", [], function () {
  console.log("\n***********************");
  console.log("* Tell me what to do: *");
  console.log("***********************");
  console.log("* gulp lint           *");
  console.log("* gulp test           *");
  console.log("***********************\n");
  return true;
});
