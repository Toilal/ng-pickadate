ng-pickadate
====================

Set of AngularJS directives for [pickadate.js by Amsul](http://amsul.ca/pickadate.js/).

### Requirements

- [AngularJS](https://angularjs.org/)
- [pickadate](http://amsul.ca/pickadate.js/)
- [JQuery](http://jquery.com/)

### Install

    bower install ng-pickadate

### Usage

1. Declare the dependency

        angular.module('yourApp', ['pickadate']);

2. Use `pick-a-date` and `pick-a-time` directives.

        <input type="text" pick-a-date="curDate"/>
        <input type="text" pick-a-time="curDate"/>

3. You can also provide additionnal `max-date` and `min-date` values.

        <input type="text" pick-a-date="startDate" max-date="endDate"/>
        <input type="text" pick-a-date="endDate" min-date="startDate"/>

### Options

You can define [pickadate.js](http://amsul.ca/pickadate.js/) options through `pick-a-date-options` and `pick-a-time-options` directives as well.

    <input type="text" pick-a-date="curDate" pick-a-date-options="{ format: 'dd/mm/yy', selectYears: true }" />

### Credits

This project is initially based on a [blog post from Coding Insight](http://www.codinginsight.com/angularjs-and-pickadate/)