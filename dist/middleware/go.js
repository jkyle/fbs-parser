'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (next, select) {
  return function (event, state) {
    if (event.type === 'GO') {
      var atLocation = select.get(['$LOCATION', 'items'])(state).indexOf(event.subject) > -1 || select.get(['$LOCATION', 'exits'])(state).indexOf(event.subject) > -1;

      if (!atLocation) {
        return select.add(['$BUFFER'], "You can't go there from here.")(state);
      }

      var enterEvent = { subject: event.subject, type: 'ENTER' };
      var exitEvent = { subject: state.location, type: 'EXIT' };
      return next(exitEvent, state, function (newState) {
        return next(event, newState, function (newerState) {
          return next(enterEvent, newerState, function (finalState) {
            return select.set(['$GLOBAL', 'location'], event.subject)(state);
          });
        });
      });
    }
    return next(event, state);
  };
};