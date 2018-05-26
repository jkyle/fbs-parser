'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (next, select) {
  return function (action, state) {
    if (action.type === 'START') {
      var gameObjects = select('$OBJECTS', state).get();

      return Object.keys(gameObjects).reduce(function (acc, key) {
        var localAction = _extends({}, action, { subject: key });
        return next(localAction, acc);
      }, state);
    }
    return next(action, state);
  };
};