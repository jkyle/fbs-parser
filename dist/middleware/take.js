'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _location = require('../selectors/location');

var _location2 = _interopRequireDefault(_location);

var _util = require('../selectors/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (next, select) {
  return function (event, state) {
    if (event.type === 'TAKE') {
      var atLocation = select('$LOCATION.items', state).get().indexOf(event.subject) > -1 || select('$LOCATION.exits', state).get().indexOf(event.subject) > -1;

      if (!atLocation) {
        return select('$BUFFER', state).add('There\'s no ' + event.subject + ' here.');
      }

      if (!select([event.subject, 'properties', 'takeable'], state).get()) {
        return select('$BUFFER', state).add('You can\'t take ' + event.subject + '.');
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }

      // I know, I know.
      return select('$LOCATION.items', select('$INVENTORY', select('$BUFFER', state).add('You take ' + event.subject)).add(event.subject)).remove(event.subject);
    }
    return next(event, state);
  };
};