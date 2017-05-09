'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (next, select) {
  return function (originalEvent, state) {
    if (originalEvent.type === 'LOOK') {
      var event = !originalEvent.subject ? _extends({}, originalEvent, { subject: state.location }) : originalEvent;

      var here = select.get(['$INVENTORY'])(state).indexOf(event.subject) > -1 || select.get(['$LOCATION', 'items'])(state).indexOf(event.subject) > -1 || select.get(['$LOCATION', 'exits'])(state).indexOf(event.subject) > -1 || select.get(['$GLOBAL', 'location'])(state) === event.subject;

      if (!here) {
        return select.add(['$BUFFER', "You don't see that here."])(state);
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      return select.add(['$BUFFER'], 'You see ' + event.subject + ', but it\'s not very interesting.')(state);
    }
    return next(originalEvent, state);
  };
};