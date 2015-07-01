(function (angular) {
  'use strict';

  angular.module('pickadate', []);

  angular.module('pickadate').directive('pickADate', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = {
          pickADate: $parse(attrs.pickADate),
          minDate: $parse(attrs.minDate),
          maxDate: $parse(attrs.maxDate),
          pickADateOptions: $parse(attrs.pickADateOptions)
        };

        var userOptions = model.pickADateOptions(scope) || {};
        var options = angular.extend({}, userOptions);

        options.onSet = function (e) {
          if (userOptions && userOptions.onSet) {
            userOptions.onSet.apply(this, arguments);
          }
          var select = element.pickadate('picker').get('select'); // selected date

          scope.$evalAsync(function () {
            if (e.hasOwnProperty('clear')) {
              model.pickADate.assign(scope, null);
              return;
            }
            if (select) {
              var date = model.pickADate(scope);
              if (!date) {
                date = new Date(0);
                model.pickADate.assign(scope, date);
              }
              date.setYear(select.obj.getFullYear());
              date.setDate(select.obj.getDate());
              date.setMonth(select.obj.getMonth());
            } else {
              model.pickADate.assign(scope, select);
            }
          });
        };

        options.onClose = function () {
          if (userOptions && userOptions.onClose) {
            userOptions.onClose.apply(this, arguments);
          }
          element.blur();
        };

        element.pickadate(options);
        function updateValue(newValue) {
          if (newValue) {
            var date = (newValue instanceof Date) ? newValue : new Date(newValue);
            element.pickadate('picker').set('select', date.getTime());
            model.pickADate.assign(scope, date);
          } else {
            element.pickadate('picker').clear();
            model.pickADate.assign(scope, null);
          }
        }

        updateValue(model.pickADate(scope));
        var minDate = model.minDate(scope);
        var maxDate = model.maxDate(scope);
        element.pickadate('picker').set('min', minDate ? minDate : false);
        element.pickadate('picker').set('max', maxDate ? maxDate : false);

        scope.$watchGroup([attrs.pickADate, attrs.minDate, attrs.maxDate], function(newValues, oldValues) {
          var newValue = newValues[0], newMin = newValues[1], newMax = newValues[2],
              oldValue = oldValues[0], oldMin = oldValues[1], oldMax = oldValues[2];

          if (newMin !== oldMin) {
            element.pickadate('picker').set('min', newValues[1] ? newValues[1] : false);
          }
          if (newMax !== oldMax) {
            element.pickadate('picker').set('max', newValues[2] ? newValues[2] : false);
          }
          if (newValue !== oldValue) {
            updateValue(newValues[0]);
          }
        }, true);
      }
    };
  }]);

  angular.module('pickadate').directive('pickATime', ['$parse',function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = {
          pickATime: $parse(attrs.pickATime),
          pickATimeOptions: $parse(attrs.pickATimeOptions)
        };

        var userOptions = model.pickATimeOptions(scope) || {};
        var options = angular.extend({}, userOptions);

        options.onSet = function (e) {
          if (userOptions && userOptions.onSet) {
            userOptions.onSet.apply(this, arguments);
          }
          var select = element.pickatime('picker').get('select'); // selected date

          scope.$evalAsync(function () {
            if (e.hasOwnProperty('clear')) {
              model.pickATime.assign(scope, null);
              return;
            }
            if (select) {
              var date = model.pickATime(scope);
              if (!date) {
                date = new Date(0);
                model.pickATime.assign(scope, date);
              }
              date.setHours(select.hour);
              date.setMinutes(select.mins);
              date.setSeconds(0);
              date.setMilliseconds(0);
            } else {
              model.pickATime.assign(scope, select);
            }
          });
        };

        options.onClose = function () {
          if (userOptions && userOptions.onClose) {
            userOptions.onClose.apply(this, arguments);
          }
          element.blur();
        };

        element.pickatime(options);
        function updateValue(newValue) {
          if (newValue) {
            var date = (newValue instanceof Date) ? newValue : new Date(newValue);
            var totalMins = date.getHours() * 60 + date.getMinutes();
            element.pickatime('picker').set('select', totalMins);
            model.pickATime.assign(scope, date);
          } else {
            element.pickatime('picker').clear();
            model.pickATime.assign(scope, null);
          }
        }

        updateValue(model.pickATime(scope));
        scope.$watch(attrs.pickATime, function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          updateValue(newValue);
        }, true);
      }
    };
  }]);
})(angular);

