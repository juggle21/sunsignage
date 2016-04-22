"use strict";

/*jshint node: true */
/* global concat: true */

// ************************
// * Rise Vision Storage UI *
// * build script         *
// ************************

// Include gulp

var env = process.env.NODE_ENV || "dev",
    gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    watch = require("gulp-watch"),
    factory = require("widget-tester").gulpTaskFactory,
    runSequence = require("run-sequence"),
    html2js = require("gulp-html2js"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    usemin = require("gulp-usemin"),
    es = require("event-stream"),
    uglify = require("gulp-uglify"),
    prettify = require("gulp-jsbeautifier"),
    minifyCss = require("gulp-minify-css"),
    gulpInject = require("gulp-inject");

    var unitTestFiles = [
    "../jquery/dist/jquery.js",
    "../angular/angular.js",
    "../q/q.js",
    "../lodash/dist/lodash.js",
    "../ngstorage/ngStorage.js",
    "../angular-bootstrap/ui-bootstrap-tpls.js",
    "../angular-ui-flow-manager/src/js/*.js",
    "../angular-mocks/angular-mocks.js",
    "../angular-sanitize/angular-sanitize.js",
    "../angular-spinner/angular-spinner.js",
    "../angular-touch/angular-touch.js",
    "../angular-ui-router/release/angular-ui-router.js",
    "../ng-biscuit/dist/ng-biscuit.js",
    "../ng-csv/build/ng-csv.js",
    "../angular-local-storage/dist/angular-local-storage.js",
    "../rv-loading/loading.js",
    "../rv-common-svg/dist/svg.js",
    "../ng-gapi-loader/src/js/*.js",
    "../ng-core-api-client/src/js/*.js",
    "../checklist-model/checklist-model.js",
    "../rv-common-app-../dist/js/last-modified.js",
    "../rv-common-app-../dist/js/search-filter.js",
    "../rv-common-app-../dist/js/scrolling-list.js",
    "../rv-common-app-../dist/js/stop-event.js",
    "../rv-common-app-../dist/js/segment-analytics.js",
    "../mustache/mustache.js",
    "../rv-gapi-mock/observed-browser.js",
    "../rv-gapi-mock/_mock-data.js",
    "../rv-gapi-mock/gapi-mock-data/*.js",
    "../rv-gapi-mock/gapi-mock.js",
    "../component-subscription-status/dist/js/subscription-status.js",
    "../widget-settings-ui-core/dist/widget-settings-ui-core.js",
    "../angular-translate/angular-translate.js",
    "../angular-translate-loader-static-files/angular-translate-loader-static-files.js",
    "../rv-common-i18n/dist/i18n.js",
    "node_modules/widget-tester/mocks/translate-mock.js",
    "src/templates.js",
    "src/js/**/*.js",
    "test/unit/**/*spec.js"
    ],
    commonHeaderSrcFiles = ["./src/templates.js", "./src/js/dtv-common-header.js",
    "./src/js/directives/dtv-integer-parser.js",
    "./src/js/directives/dtv-empty-select-parser.js",
    "./src/js/directives/dtv-company-buttons.js",
    "./src/js/directives/dtv-require-role.js",
    "./src/js/controllers/ctr-global-alerts.js",
    "./src/js/controllers/ctr-help-buttons.js",
    "./src/js/controllers/ctr-help-priority-support-modal.js",
    "./src/js/controllers/ctr-help-send-us-a-note-modal.js",
    "./src/js/controllers/ctr-auth-buttons.js",
    "./src/js/controllers/ctr-signup-modal.js",
    "./src/js/controllers/ctr-signup-button.js",
    "./src/js/controllers/ctr-company-buttons.js",
    "./src/js/controllers/ctr-shoppingcart.js",
    "./src/js/controllers/ctr-close-frame.js",
    "./src/js/controllers/ctr-system-messages.js",
    "./src/js/controllers/ctr-register-button.js",
    "./src/js/controllers/ctr-registration-modal.js",
    "./src/js/controllers/ctr-move-company-modal.js",
    "./src/js/controllers/ctr-company-settings-modal.js",
    "./src/js/controllers/ctr-subcompany-modal.js",
    "./src/js/controllers/ctr-subcompany-selector-modal.js",
    "./src/js/controllers/ctr-subcompany-banner.js",
    "./src/js/controllers/ctr-test-company-banner.js",
    "./src/js/controllers/ctr-company-users-modal.js",
    "./src/js/controllers/ctr-user-add-modal.js",
    "./src/js/controllers/ctr-user-settings-modal.js",
    "./src/js/controllers/ctr-signout-button.js",
    "./src/js/controllers/ctr-signout-modal.js",
    "./src/js/controllers/ctr-safe-delete-modal.js",
    "./src/js/ui-../off-canvas-nav.js",
    "./src/js/ui-../action-sheet.js",
    "./src/js/svc-util.js",
    "./src/js/svc-geodata.js",
    "./src/js/svc-rv-token-store.js",
    "./src/js/svc-userstate.js",
    "./src/js/svc-companystate.js",
    "./../angular-ui-flow-manager/src/js/svc-ui-flow.js",
    "./src/js/svc-account.js",
    "./src/js/svc-registration.js",
    "./src/js/svc-support-factory.js",
    "./../ng-core-api-client/src/js/svc-cache.js",
    "./../ng-core-api-client/src/js/svc-core-util.js",
    "./../ng-core-api-client/src/js/svc-user.js",
    "./../ng-core-api-client/src/js/svc-company.js",
    "./../ng-core-api-client/src/js/svc-oauth2.js",
    "./../ng-core-api-client/src/js/svc-system-messages.js",
    "./../ng-core-api-client/src/js/svc-countries.js",
    "./../ng-core-api-client/src/js/svc-fastpass.js",
    "./src/js/directives/dtv-fastpass.js",
    "./src/js/directives/dtv-link-cid.js",
    "./src/js/svc-selected-company-url-handler.js",
    "./src/js/svc-shoppingcart.js",
    "./src/js/svc-currency.js",
    "./src/js/config/config.js",
    "./src/js/svc-config.js",
    "./../ng-gapi-loader/src/js/svc-gapi.js",
    "./src/js/svc-localstorage.js",
    "./src/js/svc-system-messages.js",
    "./src/js/svc-data-gadgets.js",
    "./src/js/svc-big-query-logging.js",
    "./src/js/svc-external-logging.js",
    "./src/js/svc-cookie-tester.js",
    "./../rv-common-app-../dist/js/last-modified.js",
    "./../rv-common-app-../dist/js/search-filter.js",
    "./../rv-common-app-../dist/js/scrolling-list.js",
    "./../rv-common-app-../dist/js/stop-event.js",
    "./../rv-common-app-../dist/js/segment-analytics.js",
    "./../component-subscription-status/dist/js/subscription-status.js",
    "./../widget-settings-ui-core/dist/widget-settings-ui-core.js",
    "./../angular-translate/angular-translate.js",
    "./../angular-translate-loader-static-files/angular-translate-loader-static-files.js",
    "./../rv-common-i18n/dist/i18n.js"
    ],
    dependencySrcFiles = ["./../jquery/dist/jquery.js",
    "./../angular/angular.js",
    "./../angular-route/angular-route.js",
    "./../angular-sanitize/angular-sanitize.js",
    "./../angular-animate/angular-animate.js",
    "./../angular-touch/angular-touch.js",
    "./../angular-bootstrap/ui-bootstrap-tpls.js",
    "./../angular-ui-router/release/angular-ui-router.js",
    "./../checklist-model/checklist-model.js",
    "./../ngstorage/ngStorage.js",
    "./../angular-spinner/angular-spinner.js",
    "./../spin.js/spin.js",
    "./../rv-common-svg/dist/svg.js",
    "./../rv-loading/loading.js",
    "./../ng-biscuit/dist/ng-biscuit.js",
    "./../lodash/dist/lodash.js",
    "./../jquery-ui/ui/jquery-ui.js",
    "./../ng-csv/build/ng-csv.js",
    "./../angular-ui-sortable/sortable.js",
    "./../angular-local-storage/dist/angular-local-storage.js"],
    gapiMockSrcFiles = [
    "./node_modules/widget-tester/mocks/segment-analytics-mock.js"
    ],
    injectorGenerator = function (srcFiles, id) {
      return gulpInject(
        gulp.src(srcFiles,
          {read: false}),
          {starttag: "<!-- inject:" + id + ":{{ext}} -->", relative: true});
      };

gulp.task("coerce-prod-env", function () {
  env = "prod";
});

/*---- tooling ---*/
gulp.task("pretty", function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(prettify({config: "../../../.jsbeautifyrc", mode: "VERIFY_AND_WRITE"}))
    .pipe(gulp.dest("./src/js"))
    .on("error", function (error) {
      console.error(String(error));
    });
});

gulp.task("html", ["coerce-prod-env", "html-inject", "html2js", "lint"], function () {
  return es.concat(
    gulp.src("test/e2e/index.html")
    .pipe(usemin({ js: [], css: [] }))
    .pipe(gulp.dest("dist/")),
    //minified
    gulp.src("test/e2e/index.html")
    .pipe(usemin({
      js: [uglify()], css: [minifyCss()]
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist/"))
  );
});


gulp.task("build", ["html"]);

var localeFiles = [
  "../rv-common-i18n/dist/locales/**/*"
];

gulp.task("locales", function() {
  return gulp.src(localeFiles)
    .pipe(gulp.dest("dist/locales"));
});

gulp.task("fonts-copy", function () {
  //TODO This is a temporary solution. Dulpicate files. Not recommended

  return es.concat(
    gulp.src(["src/css/fonts/*"])
    .pipe(gulp.dest("./dist/css/fonts")),
    gulp.src(["src/css/fonts/*"])
    .pipe(gulp.dest("./dist/fonts"))),
    gulp.src(["../font-awesome/fonts/*"])
    .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("lint", ["config", "locales", "fonts-copy", "pretty"], function() {
  return gulp.src([
      "src/js/**/*.js",
      "test/**/*.js"
    ])
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"))
    .on("error", function () {
      process.exit(1);
    });
});

gulp.task("html-inject", function () {
  return es.concat(
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(rename("popup-auth.html"))
    .pipe(gulp.dest("src/html")),
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(rename("popup-auth_e2e.html"))
    .pipe(gulp.dest("src/html")),
    gulp.src("test/e2e/index_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("test/e2e"))
  );
});

gulp.task("html-inject-watch", function () {
  watch({glob: "src/**/*"}, function () {
    return es.concat(gulp.src("src/html/popup-auth_raw.html")
    .pipe(rename("popup-auth.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(gulp.dest("src/html")),
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(rename("popup-auth_e2e.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(gulp.dest("src/html")),
    gulp.src("test/e2e/index_raw.html")
    .pipe(rename("index.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(gulp.dest("test/e2e")));
  });

});

gulp.task("html2js", function() {
  return gulp.src("src/templates/**/*.html")
    .pipe(html2js({
      outputModuleName: "risevision.common.header.templates",
      useStrict: true,
      base: "src/templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./src/"));
});

gulp.task("html2js-watch", function() {
  watch({glob: "src/templates/**/*.html"}, function(){
    return gulp.src("src/templates/**/*.html").pipe(html2js({
      outputModuleName: "risevision.common.header.templates",
      useStrict: true,
      base: "src/templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./src/"));
  });
});

gulp.task("build-watch", function() {
  watch({glob: ["src/js/**/*", "src/templates/**/*"]}, function () {
    return runSequence("html");
  });
});

// Update bower, component, npm at once:
gulp.task("bump", function(){
  gulp.src(["./bower.json", "./package.json"])
  .pipe(require("gulp-bump")({type: "patch"}))
  .pipe(gulp.dest("./"));
});

/* Task: config
 * Copies configuration file in place based on the current
   environment variable (default environment is dev)
*/
gulp.task("config", function() {
  return gulp.src(["./src/js/config/" + env + ".js"])
    .pipe(rename("config.js"))
    .pipe(gulp.dest("./src/js/config"));
});

gulp.task("test:unit", ["config"], factory.testUnitAngular({
  testFiles: unitTestFiles,
  coverageFiles: "../../src/js/**/*.js"
}));
gulp.task("test:unit-watch", ["config"], factory.testUnitAngular({testFiles: unitTestFiles, watch: true}));

gulp.task("server", ["html-inject", "html2js", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-watch", ["html-inject-watch", "html2js-watch", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
  browser: "chrome",
  loginUser: process.env.E2E_USER2,
  loginPass: process.env.E2E_PASS2,
  testFiles: process.env.TEST_FILES || ["./test/e2e/**/*.scenarios.js"]
}));
gulp.task("test:e2e", function (cb) {
  runSequence("server", "test:e2e:core", "server-close", cb);
});

gulp.task("coveralls", factory.coveralls());

gulp.task("test", ["lint"], function (cb) {
  runSequence("test:unit", "test:e2e", "coveralls", cb);
});

gulp.task("watch", ["test:unit-watch"]);

gulp.task("default", [], function () {
  console.log("\n***********************");
  console.log("* Tell me what to do: *");
  console.log("***********************");
  console.log("* gulp test           *");
  console.log("* gulp build          *");
  console.log("* gulp watch          *");
  console.log("***********************\n");
  return true;
});
