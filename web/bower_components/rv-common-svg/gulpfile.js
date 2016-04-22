'use strict'
/* global require */

var gulp = require("gulp");
var path = require("path");
var bump = require("gulp-bump");
var colors = require("colors");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var rename = require("gulp-rename");

var paths = {
  js: "./src",
  distJs: "./dist",
};

gulp.task("bump", function(){
  return gulp.src(["./package.json", "./bower.json"])
    .pipe(bump({type:"patch"}))
    .pipe(gulp.dest("./"));
});

gulp.task("minify-js", function () {
  gulp.src(paths.js + '/**/*.js') // path to your files
    .pipe(concat('svg.js'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(rename('svg.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJs));
});

gulp.task("build", ["minify-js"], function() {

});

gulp.task("dev", function() {
  // Build locales on start once
  gulp.run("build");

  // Watch locale files for changes
  gulp.watch([paths.js], ["build"]);
  console.log("[svg] Watching for changes in js files".yellow.inverse);
});

gulp.task("default", [], function() {
  console.log("***********************".yellow);
  console.log("  gulp dev: watch for changes in js files".yellow);
  console.log("  gulp build: build a distribution version".yellow);
  console.log("***********************".yellow);
  return true;
});
