'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var initialSelectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var selectors = initialSelectors;

  var buildArray = function buildArray(key, state, event) {
    if (Array.isArray(selectors[key])) {
      return selectors[key].reduce(function (acc, i) {
        if (Array.isArray(i)) {
          return [].concat(_toConsumableArray(acc), [get(i, event)(state)]);
        } else {
          return [].concat(_toConsumableArray(acc), _toConsumableArray(buildArray(i, state, event)));
        }
      }, []);
    } else if (key.toUpperCase() === key) {
      return [].concat(_toConsumableArray(buildArray('$OBJECTS', state, event)), [key]);
    } else {
      return [key];
    }
  };

  var get = function get(inKeyArr, event) {
    return function (state) {
      var keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr;
      var arr = keyArr.reduce(function (acc, i) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(buildArray(i, state, event)));
      }, []);
      return (0, _util.getPropertyFromObject)(state, arr);
    };
  };

  var set = function set(inKeyArr, value, event) {
    return function (state) {
      var keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr;
      var arr = keyArr.reduce(function (acc, i) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(buildArray(i, state, event)));
      }, []);
      return (0, _util.setPropertyForObject)(state, arr, value);
    };
  };

  var add = function add(keyArr, value, event) {
    return function (state) {
      var collection = get(keyArr, event)(state);
      var newCollection = collection.indexOf(value) > -1 ? collection : [value].concat(_toConsumableArray(collection));
      return set(keyArr, newCollection, event)(state);
    };
  };

  var remove = function remove(keyArr, value, event) {
    return function (state) {
      var collection = get(keyArr, event)(state);
      var newCollection = collection.filter(function (i) {
        return i !== value;
      });
      return set(keyArr, newCollection, event)(state);
    };
  };

  return {
    get: get, set: set, add: add, remove: remove
  };
};