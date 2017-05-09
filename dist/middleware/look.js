'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (next, select) {
  return function (originalEvent, state) {
    if (originalEvent.type === 'LOOK') {
      var event = !originalEvent.subject ? _extends({}, originalEvent, { subject: state.location }) : originalEvent;

      var here = select('$INVENTORY').get()(state).indexOf(event.subject) > -1 || select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 || select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1 || select('$GLOBAL.location').get()(state) === event.subject;

      if (!here) {
        return select('$BUFFER').add("You don't see that here.")(state);
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      return select('$BUFFER').add('You see ' + event.subject + ', but it\'s not very interesting.')(state);
    }
    return next(originalEvent, state);
  };
};