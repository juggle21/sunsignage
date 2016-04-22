Rise Vision Common SVG
==============

**Copyright © 2014 - Rise Vision Incorporated.**

*Use of this software is governed by the GPLv3 license (available in the LICENSE file).*

## Introduction
Common SVG icons to be shared across Rise Vision apps, widgets and components.

## Built With

- *NPM*
- *Gulp*
- *Bower*


## Development

### Local Development Environment Setup and Installation

1. Install node dependencies `$ npm install`

2. Install front-end dependencies `$ bower install`

### Run Local
Run `$ gulp` to see a list of available tasks.


## Build
To build run `$ gulp build`. This will generate a `dist` folder with a `locales` folder, containing a combined and minified json file for each locale, named translation_{lang}.json.

The JSON files in `locales_json` will also be regenerated based on the existing PO files.


## Usage
Install the common-svg using bower `$ bower install git://github.com/Rise-Vision/common-svg --save`

The `dist` folder contains the minified (svg.min.js) and un-minified (svg.js) versions of the directive.

### Using the svg directive

In case you are using the provided svg Angularjs directive, you will need to include the following script reference in your main HTML page:

```
<script type="text/javascript" src="components/rv-common-svg/dist/svg.js"></script>
```

Your Angularjs module will need to have a reference to *risevision.common.svg*:

    angular.module("my-module", ["risevision.common.svg"]);

### Dependencies
- Angularjs
- Angular translate
- Angular translate loader static files


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

### Suggested Contributions
- *we need this*
- *and we need that*
- *we could really use this*

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Alex Deaconu](https://github.com/alex-deaconu "Alex Deaconu")
