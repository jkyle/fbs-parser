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
      var atLocation = select.get(['$LOCATION', 'items'])(state).indexOf(event.subject) > -1 || select.get(['$LOCATION', 'exits'])(state).indexOf(event.subject) > -1;

      if (!atLocation) {
        return select.add(['$BUFFER'], 'There\'s no ' + event.subject + ' here.')(state);
      }

      if (!select.get([event.subject, 'properties', 'takeable'])(state)) {
        return select.add(['$BUFFER'], 'You can\'t take ' + event.subject + '.')(state);
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }

      var actions = (0, _util.compose)(select.remove(['$LOCATION', 'items'], event.subject), select.add(['$INVENTORY'], event.subject), select.add(['$BUFFER'], 'You take ' + event.subject));

      return actions(state);
    }
    return next(event, state);
  };
};