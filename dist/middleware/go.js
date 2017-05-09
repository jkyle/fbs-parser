'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (next, select) {
  return function (event, state) {
    if (event.type === 'GO') {
      var atLocation = select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 || select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1;

      if (!atLocation) {
        return select('$BUFFER').add("You can't go there from here.")(state);
      }

      var enterEvent = { subject: event.subject, type: 'ENTER' };
      var exitEvent = { subject: state.location, type: 'EXIT' };
      return next(enterEvent, next(event, next(exitEvent, select('$GLOBAL.location').set(event.subject)(state))));
    }
    return next(event, state);
  };
};