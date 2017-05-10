'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selectors = require('../selectors');

exports.default = function (next, select) {
  return function (event, state) {
    if (event.type === 'TAKE') {
      var subject = event.subject;
      var atLocation = select('$LOCATION.items', state).has(subject) || select('$LOCATION.exits', state).has(subject);

      if (!atLocation) {
        return select('$BUFFER', state).add('There\'s no ' + subject + ' here.');
      }

      var takeable = select([subject, 'properties', 'takeable'], state).get();
      if (!takeable) {
        return select('$BUFFER', state).add('You can\'t take ' + subject + '.');
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }

      var buffer = function buffer(newState) {
        return select('$BUFFER', newState).add('You take ' + subject);
      };
      var inventory = function inventory(newState) {
        return select('$INVENTORY', newState).add(subject);
      };
      var location = function location(newState) {
        return select('$LOCATION.items', newState).remove(subject);
      };
      return (0, _selectors.compose)(buffer, inventory, location)(state);
    }
    return next(event, state);
  };
};