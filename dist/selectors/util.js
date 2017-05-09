"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var has = function has(object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

var setPropertyForObject = exports.setPropertyForObject = function setPropertyForObject(object, _ref, value) {
  var _ref2 = _toArray(_ref),
      prop = _ref2[0],
      rest = _ref2.slice(1);

  return rest.length === 0 ? _extends({}, object, _defineProperty({}, prop, value)) : _extends({}, object, _defineProperty({}, prop, setPropertyForObject(object[prop] || {}, rest, value)));
};

var getPropertyFromObject = exports.getPropertyFromObject = function getPropertyFromObject(object, propertyArr) {
  return propertyArr.reduce(function (acc, prop) {
    return acc && has(acc, prop) ? acc[prop] : undefined;
  }, object);
};

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (state) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, state);
  };
};