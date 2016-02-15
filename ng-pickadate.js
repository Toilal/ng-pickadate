(function (angular) {
  'use strict';

  angular.module('pickadate', []);

  angular.module('pickadate').provider('pickADate', pickADateProvider);

  angular.module('pickadate').provider('pickATime', pickATimeProvider);

  angular.module('pickadate').directive('pickADate', ['$parse', 'pickADate', function ($parse, pickADate) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        var hasOnOpenRun = false;
        var model = {
          pickADate: $parse(attrs.pickADate),
          minDate: $parse(attrs.minDate),
          maxDate: $parse(attrs.maxDate),
          pickADateOptions: $parse(attrs.pickADateOptions)
        };

        var defaultOptions = pickADate.getOptions() || {};
        var userOptions = model.pickADateOptions(scope) || {};
        var options = angular.extend({}, defaultOptions, userOptions);

        options.onSet = function (e) {
          var that = this,
              args = arguments,
              select = element.pickadate('picker').get('select'); // selected date

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
              date.setFullYear(select.obj.getFullYear(), select.obj.getMonth(), select.obj.getDate());
            } else {
              model.pickADate.assign(scope, select);
            }
            if (userOptions && userOptions.onSet) {
              userOptions.onSet.apply(that, args);
            }
            if (defaultOptions && defaultOptions.onSet) {
              defaultOptions.onSet.apply(that, args);
            }
          });
        };

        options.onOpen = function (e) {
          if (ngModel) {
            if (!hasOnOpenRun) {
              hasOnOpenRun = true;
              scope.$apply(function () {
                ngModel.$setUntouched();
              });
            }
          }
          if (userOptions && userOptions.onOpen) {
            userOptions.onOpen.apply(this, arguments);
          }
          if (defaultOptions && defaultOptions.onOpen) {
            defaultOptions.onOpen.apply(this, arguments);
          }
        };

        options.onClose = function () {
          if (ngModel) {
            scope.$applyAsync(function () {
              ngModel.$setTouched();
            });
          }
          if (userOptions && userOptions.onClose) {
            userOptions.onClose.apply(this, arguments);
          }
          if (defaultOptions && defaultOptions.onClose) {
            defaultOptions.onClose.apply(this, arguments);
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

        if (ngModel) {
          ngModel.$setPristine();
        }
      }
    };
  }]);

  angular.module('pickadate').directive('pickATime', ['$parse', 'pickATime', function ($parse, pickATime) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        var hasOnOpenRun = false;
        var model = {
          pickATime: $parse(attrs.pickATime),
          pickATimeOptions: $parse(attrs.pickATimeOptions)
        };

        var defaultOptions = pickATime.getOptions() || {};
        var userOptions = model.pickATimeOptions(scope) || {};
        var options = angular.extend({}, defaultOptions, userOptions);

        options.onSet = function (e) {
          var that = this,
              args = arguments,
              select = element.pickatime('picker').get('select'); // selected date

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
            if (userOptions && userOptions.onSet) {
              userOptions.onSet.apply(that, args);
            }
            if (defaultOptions && defaultOptions.onSet) {
              defaultOptions.onSet.apply(that, args);
            }
          });
        };

        options.onOpen = function () {
          if (ngModel) {
            if (!hasOnOpenRun) {
              hasOnOpenRun = true;
              scope.$apply(function () {
                ngModel.$setUntouched();
              });
            }
          }
          if (userOptions && userOptions.onOpen) {
            userOptions.onOpen.apply(this, arguments);
          }
          if (defaultOptions && defaultOptions.onOpen) {
            defaultOptions.onOpen.apply(this, arguments);
          }
        };

        options.onClose = function () {
          if (ngModel) {
            scope.$applyAsync(function () {
              ngModel.$setTouched();
            });
          }
          if (userOptions && userOptions.onClose) {
            userOptions.onClose.apply(this, arguments);
          }
          if (defaultOptions && defaultOptions.onClose) {
            defaultOptions.onClose.apply(this, arguments);
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

        function updateOptions(newValue) {
          if (typeof newValue === "object") {
            element.pickatime('picker').set(newValue)
          }
        }

        scope.$watch(attrs.pickATimeOptions, function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          updateOptions(newValue)
        }, true);


        if (ngModel) {
          ngModel.$setPristine();
        }
      }
    };
  }]);

  function pickADateProvider() {
    var config;
    this.setOptions = function (options) {
      if (config) {
        throw new Error("Already configured.");
      }
      if (!(options instanceof Object)) {
        throw new TypeError("Invalid argument: `config` must be an `Object`.");
      }
      config = angular.extend({}, options);
      return config;
    };
    this.$get = function () {
      var PickADate = function () {
        function PickADate() {}

        Object.defineProperties(PickADate.prototype, {
          getOptions: {
            value: function getOptions() {
              return angular.copy(config);
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
        });
        return PickADate;
      }();
      return new PickADate();
    };
    this.$get.$inject = [];
  }

  function pickATimeProvider() {
    var config;
    this.setOptions = function (options) {
      if (config) {
        throw new Error("Already configured.");
      }
      if (!(options instanceof Object)) {
        throw new TypeError("Invalid argument: `config` must be an `Object`.");
      }
      config = angular.extend({}, options);
      return config;
    };
    this.$get = function () {
      var PickATime = function () {
        function PickATime() {}

        Object.defineProperties(PickATime.prototype, {
          getOptions: {
            value: function getOptions() {
              return angular.copy(config);
            },
            writable: true,
            enumerable: true,
            configurable: true
          },
        });
        return PickATime;
      }();
      return new PickATime();
    };
    this.$get.$inject = [];
  }
})(angular);
