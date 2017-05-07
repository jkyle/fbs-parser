"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var atLocation = function atLocation(subject, state) {
  return state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1;
};

var inInventory = function inInventory(subject, state) {
  return state.objects.PLAYER.items.indexOf(subject) > -1;
};

exports.default = function (next) {
  return function (originalEvent, state) {
    if (originalEvent.type === 'LOOK') {
      var event = !originalEvent.subject ? _extends({}, originalEvent, { subject: state.location }) : originalEvent;
      if (!(inInventory(event.subject, state) || atLocation(event.subject, state) || event.subject === state.location)) {
        return _extends({}, state, { buffer: ["You don't see that here."].concat(_toConsumableArray(state.buffer)) });
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      return _extends({}, newState, { buffer: ["You see " + event.subject + ", but it's not very interesting."].concat(_toConsumableArray(state.buffer)) });
    }
    return next(originalEvent, state);
  };
};