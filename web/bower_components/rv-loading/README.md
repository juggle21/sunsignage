angular-spinner
===============

The Rise Vision AngularJS Spinner

## Usage

### Global Fullscreen Spinner

```javascript
angular.module("myApp")
.controller("myController", ["$loading", function ($loading) {
  $loading.startGlobal("some-job-key");
  doSomeWork.then(...).finally(function () {
    $loading.stopGolbal("some-job-key");
  });
}]);
```

### Partial/local Spinner

```html
<div rv-spinner rv-spinner-key="myDiv" rv-spinner-options="optionsVariableOnScipe"></div>
```

```javascript
angular.module("myApp")
.controller("myController", ["$loading", function ($loading) {
  $loading.start("myDiv");
  doSomeWork.then(...).finally(function () {
    $loading.stop("myDiv");
  });
}]);
```
