'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// convert "GO" to "ENTER" and "EXIT"
var atLocation = function atLocation(subject, state) {
  return state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1;
};

exports.default = function (next) {
  return function (event, state) {
    if (event.type === 'GO') {
      if (!atLocation(event.subject, state)) {
        return _extends({}, state, { buffer: ["You can't go there from here."].concat(_toConsumableArray(state.buffer)) });
      }

      var enterEvent = { subject: event.subject, type: 'ENTER' };
      var exitEvent = { subject: state.location, type: 'EXIT' };
      return next(exitEvent, state, function (newState) {
        return next(event, newState, function (newerState) {
          return next(enterEvent, newerState, function (finalState) {
            return _extends({}, finalState, { location: event.subject });
          });
        });
      });
    }
    return next(event, state);
  };
};