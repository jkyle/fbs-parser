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
      var atLocation = select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 || select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1;

      if (!atLocation) {
        return select('$BUFFER').add('There\'s no ' + event.subject + ' here.')(state);
      }

      if (!select([event.subject, 'properties', 'takeable']).get()(state)) {
        return select('$BUFFER').add('You can\'t take ' + event.subject + '.')(state);
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }

      var actions = (0, _util.compose)(select('$LOCATION.items').remove(event.subject), select('$INVENTORY').add(event.subject), select('$BUFFER').add('You take ' + event.subject));

      return actions(state);
    }
    return next(event, state);
  };
};