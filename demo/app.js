(function (angular) {
  'use strict';

  angular.module('DemoApp', ['pickadate']).controller('DemoAppCtrl', function ($scope) {
    $scope.curDate = new Date();

    $scope.curTime = new Date();
  });
})(angular);
