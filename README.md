ng-pickadate
============

[![bower version](http://img.shields.io/bower/v/ng-pickadate.svg?style=flat)](https://github.com/Toilal/ng-pickadate) 
[![npm version](http://img.shields.io/npm/v/ng-pickadate.svg?style=flat)](https://npmjs.org/package/ng-pickadate) 
[HuBoard](https://huboard.com/Toilal/ng-pickadate)

AngularJS directives for [pickadate.js](http://amsul.ca/pickadate.js/).

[http://toilal.github.io/ng-pickadate/](http://toilal.github.io/ng-pickadate/)

### Requirements

- [AngularJS](https://angularjs.org/)
- [pickadate](http://amsul.ca/pickadate.js/)
- [JQuery](http://jquery.com/)

### Install

1. Install dependency using bower

        bower install ng-pickadate --save
    
2. Set `overrides` property in bower.json to register pickadate CSS files

  - Classic theme
            
            "overrides": {
              "pickadate": {
                "main": [
                  "lib/picker.js",
                  "lib/picker.date.js",
                  "lib/picker.time.js",
                  "lib/themes/classic.css",
                  "lib/themes/classic.date.css",
                  "lib/themes/classic.time.css"
                ]
              }
            }

  - Default theme
            
            "overrides": {
              "pickadate": {
                "main": [
                  "lib/picker.js",
                  "lib/picker.date.js",
                  "lib/picker.time.js",
                  "lib/themes/default.css",
                  "lib/themes/default.date.css",
                  "lib/themes/default.time.css"
                ]
              }
            }

### Usage

1. Declare the dependency

        angular.module('yourApp', ['pickadate']);

2. Use `pick-a-date` and `pick-a-time` directives.

    ```html
    <input type="text" pick-a-date="curDate"/>
    <input type="text" pick-a-time="curTime"/>
    ```
    
    ```js
    $scope.curDate = new Date(); // Only the date part of curDate
                                 // is synced to pick-a-date directive
                                 
    $scope.curTime = new Date(); // Only the time part of timeDate
                                 // is synced to pick-a-time directive
    ```

3. You can also provide additional `max-date` and `min-date` values.

        <input type="text" pick-a-date="startDate" max-date="endDate"/>
        <input type="text" pick-a-date="endDate" min-date="startDate"/>

### Options

You can define [pickadate.js](http://amsul.ca/pickadate.js/) options through `pick-a-date-options` and 
`pick-a-time-options` directives as well.

    <input type="text" pick-a-date="curDate" pick-a-date-options="{ format: 'dd/mm/yy', selectYears: true }" />

If you find yourself setting the same options for multiple date pickers, you can set them as the default options for 
all date pickers by configuring `pickADateProvider` and `pickATimeProvider`.

  ```js
  angular.module('yourApp', ['pickadate'])
    .config(['pickADateProvider', 'pickATimeProvider', function (pickADateProvider, pickATimeProvider) {
      pickADateProvider.setOptions({
        format: 'dd/mm/yy',
        selectYears: true
      });

      pickATimeProvider.setOptions({
        today: ''
      });
    }]);
  ```

### Form Validation

[AngularJS form](https://docs.angularjs.org/guide/forms) validation can be used using `ngModel`. Keep in mind that 
`ngModel` keeps the string value of the raw input.

  ```html
  <form name="dateForm">
    <input type="text" name="dateInput" ng-model="curDateText" pick-a-date="curDate"/>
    <div ng-show="dateForm.dateInput.$error.required" style="color: red;">
      <strong>Date is required.</strong>
    </div>
  </form>
  ```

In order to correct how the pickadate.js affects `ngModel` states of its assigned input, ng-pickadate uses 
`ngModelController` to manually restore expected form validation states: `$pristine`, `$dirty`, `$untouched`, 
and `$touched`. The unexpected angular validation states caused by the pickadate.js jQuery plugin, and how they've been 
corrected, are as follows:

- When pickadate is initialized on an input, this triggers the input's `ngModel` to be marked as `$dirty`. To correct 
this, the ng-pickadate directives each set `ngModel` to `$pristine` at the end of the `postlink` function.
- When pickadate calendar opens, the input itself loses focus and its `ngModel` is marked as `$touched`. 
To correct this, the directives set `ngModel` to `$untouched` the first time the calendar opens, and set it to 
`$touched` whenever the calendar closes, via pickadate's `onOpen` and `onClose` methods, respectively.

### Credits

This project is initially based on a [blog post from Coding Insight](http://www.codinginsight.com/angularjs-and-pickadate/)
