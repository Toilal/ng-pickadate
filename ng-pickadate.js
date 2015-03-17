(function (angular) {
  'use strict';

  angular.module('pickadate', []);

  angular.module('pickadate').directive('pickADate', function () {
    return {
      restrict: 'A',
      scope: {
        pickADate: '=',
        minDate: '=',
        maxDate: '=',
        pickADateOptions: '='
      },
      link: function (scope, element) {
        var options = angular.extend(scope.pickADateOptions || {}, {
          onSet: function (e) {
            if (scope.$$phase || scope.$root.$$phase) { // we are coming from $watch or link setup
              return;
            }
            var select = element.pickadate('picker').get('select'); // selected date

            scope.$apply(function () {
              if (e.hasOwnProperty('clear')) {
                scope.pickADate = null;
                return;
              }
              if (select) {
                if (!scope.pickADate) {
                  scope.pickADate = new Date(0);
                }
                scope.pickADate.setYear(select.obj.getFullYear());
                scope.pickADate.setDate(select.obj.getDate());
                scope.pickADate.setMonth(select.obj.getMonth());
              } else {
                scope.pickADate = select;
              }
            });
          },
          onClose: function () {
            element.blur();
          }
        });
        element.pickadate(options);
        function updateValue(newValue) {
          if (newValue) {
            scope.pickADate = (newValue instanceof Date) ? newValue : new Date(newValue);
            element.pickadate('picker').set('select', scope.pickADate.getTime());
          } else {
            element.pickadate('picker').clear();
            scope.pickADate = null;
          }
        }

        updateValue(scope.pickADate);
        element.pickadate('picker').set('min', scope.minDate ? scope.minDate : false);
        element.pickadate('picker').set('max', scope.maxDate ? scope.maxDate : false);
        scope.$watch('pickADate', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          updateValue(newValue);
        }, true);
        scope.$watch('minDate', function (newValue) {
          element.pickadate('picker').set('min', newValue ? newValue : false);
        }, true);
        scope.$watch('maxDate', function (newValue) {
          element.pickadate('picker').set('max', newValue ? newValue : false);
        }, true);
      }
    };
  });

  angular.module('pickadate').directive('pickATime', function () {
    return {
      restrict: 'A',
      scope: {
        pickATime: '=',
        pickATimeOptions: '='
      },
      link: function (scope, element) {
        var options = angular.extend(scope.pickATimeOptions || {}, {
          onSet: function (e) {
            if (scope.$$phase || scope.$root.$$phase) { // we are coming from $watch or link setup
              return;
            }
            var select = element.pickatime('picker').get('select'); // selected date

            scope.$apply(function () {
              if (e.hasOwnProperty('clear')) {
                scope.pickATime = null;
                return;
              }
              if (select) {
                if (!scope.pickATime) {
                  scope.pickATime = new Date(0);
                }
                scope.pickATime.setHours(select.hour);
                scope.pickATime.setMinutes(select.mins);
                scope.pickATime.setSeconds(0);
                scope.pickATime.setMilliseconds(0);
              } else {
                scope.pickATime = select;
              }
            });
          },
          onClose: function () {
            element.blur();
          }
        });
        element.pickatime(options);
        function updateValue(newValue) {
          if (newValue) {
            scope.pickATime = (newValue instanceof Date) ? newValue : new Date(newValue);
            var totalMins = scope.pickATime.getHours() * 60 + scope.pickATime.getMinutes();
            element.pickatime('picker').set('select', totalMins);
          } else {
            element.pickatime('picker').clear();
            scope.pickATime = null;
          }
        }

        updateValue(scope.pickATime);
        scope.$watch('pickATime', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          updateValue(newValue);
        }, true);
      }
    };
  });
})(angular);

