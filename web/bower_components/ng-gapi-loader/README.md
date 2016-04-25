# ng-gapi-loader [![Circle CI](https://circleci.com/gh/Rise-Vision/ng-gapi-loader.png?style=badge)](https://circleci.com/gh/Rise-Vision/ng-gapi-loader)

## Introduction

An AngularJS-based client module that is responsible for making API calls to the [Rise Vision Core API](rise-vision.github.io/core-api).

## Built With
- [NPM (node package manager)](https://www.npmjs.org/)
- [Bower](http://bower.io/)
- [AngularJS](https://https://angularjs.org/)
- [Gulp](http://gulpjs.com/)
- [Karma](https://github.com/karma-runner/karma) and [Protractor](https://github.com/angular/protractor) for testing
- [Rise Vision Gulp Factory](https://github.com/Rise-Vision/widget-tester.git)

## Usage

```js
angular.module('myapp', ['risevision.common.gapi'])
   .factory('customGoogleClientLoader', ["gapiLoader", function (gapiLoader) {
     return gapiClientLoaderGenerator("custom", "v2");
   }])

   .service('myService', ['customGoogleClientLoader',
     function(customGoogleClientLoader) {
       customGoogleClientLoader().then(function (customLib) {
         //customLib is equivalent to window.gapi.client.custom
         customLib.somemethod(..., function () { //callback });
       })
   }]);
```

```js
angular.module('myapp', ['risevision.common.gapi'])

   .service('myService2', ['gapiLoader',
     function(gapiLoader) {
       //...
       gapiLoader().then(function (gApi) {
         //gApi === window.gapi
       });
       //...
   }]);
```

## Testing
```npm run test```

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Xiyang Chen](https://github.com/settinghead "Xiyang Chen")
