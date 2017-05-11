'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (next, select) {
  return function (originalEvent, state) {
    if (originalEvent.type === 'USE') {
      var subject = event.subject;

      var here = select('$INVENTORY', state).has(subject) || select('$LOCATION.items', state).has(subject);

      if (!here) {
        return select('$BUFFER', state).add("You don't see that here.");
      }

      next(event, state);
    }
    return next(originalEvent, state);
  };
};