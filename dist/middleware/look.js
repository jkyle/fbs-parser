'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (next, select) {
  return function (originalEvent, state) {
    if (originalEvent.type === 'LOOK') {
      var event = !originalEvent.subject ? _extends({}, originalEvent, { subject: state.location }) : originalEvent;
      var subject = event.subject;

      var here = select('$INVENTORY', state).has(subject) || select('$LOCATION.items', state).has(subject) || select('$LOCATION.exits', state).has(subject) || select('$GLOBAL.location', state).get() === subject;

      if (!here) {
        return select('$BUFFER', state).add("You don't see that here.");
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      return select('$BUFFER', state).add('You see ' + subject + ', but it\'s not very interesting.');
    }
    return next(originalEvent, state);
  };
};