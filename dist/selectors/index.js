'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.setPropertyForObject = exports.getPropertyFromObject = undefined;

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.getPropertyFromObject = _util.getPropertyFromObject;
exports.setPropertyForObject = _util.setPropertyForObject;
exports.compose = _util.compose;

exports.default = function () {
  var initialSelectors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var selectors = initialSelectors;

  var buildArray = function buildArray(key, state, event) {
    if (Array.isArray(selectors[key])) {
      return selectors[key].reduce(function (acc, i) {
        if (Array.isArray(i)) {
          return [].concat(_toConsumableArray(acc), [_get(i, event)(state)]);
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

  var _get = function _get(inKeyArr, event) {
    return function (state) {
      var keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr;
      var arr = keyArr.reduce(function (acc, i) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(buildArray(i, state, event)));
      }, []);
      return (0, _util.getPropertyFromObject)(state, arr);
    };
  };

  var _set = function _set(inKeyArr, value, event) {
    return function (state) {
      var keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr;
      var arr = keyArr.reduce(function (acc, i) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(buildArray(i, state, event)));
      }, []);
      return (0, _util.setPropertyForObject)(state, arr, value);
    };
  };

  var _add = function _add(keyArr, value, event) {
    return function (state) {
      var collection = _get(keyArr, event)(state);
      var newCollection = collection.indexOf(value) > -1 ? collection : [value].concat(_toConsumableArray(collection));
      return _set(keyArr, newCollection, event)(state);
    };
  };

  var _remove = function _remove(keyArr, value, event) {
    return function (state) {
      var collection = _get(keyArr, event)(state);
      var newCollection = collection.filter(function (i) {
        return i !== value;
      });
      return _set(keyArr, newCollection, event)(state);
    };
  };

  var _has = function _has(keyArr, value) {
    return function (state) {
      var collection = _get(keyArr)(state);
      return collection.indexOf(value) > -1;
    };
  };

  return function (keyArr, state) {
    return {
      get: function get() {
        return _get(keyArr)(state);
      },
      set: function set(value) {
        return _set(keyArr, value)(state);
      },
      add: function add(value) {
        return _add(keyArr, value)(state);
      },
      remove: function remove(value) {
        return _remove(keyArr, value)(state);
      },
      has: function has(value) {
        return _has(keyArr, value)(state);
      }
    };
  };
};