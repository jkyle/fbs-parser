'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inventory = require('../selectors/inventory');

var _inventory2 = _interopRequireDefault(_inventory);

var _location = require('../selectors/location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (next) {
  return function (event, state) {
    if (event.type === 'TAKE') {
      var loc = (0, _location2.default)(state);
      if (!loc.atLocation(event.subject)) {
        return _extends({}, state, { buffer: ['There\'s no ' + event.subject + ' here.'].concat(_toConsumableArray(state.buffer)) });
      }

      if (!state.objects[event.subject].properties.takeable) {
        return _extends({}, state, { buffer: ['You can\'t take ' + event.subject + '.'].concat(_toConsumableArray(state.buffer)) });
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      var inv = (0, _inventory2.default)(newState);
      return _extends({}, inv.add(event.subject), loc.removeItem(event.subject), {
        buffer: ['You take ' + event.subject].concat(_toConsumableArray(newState.buffer)) });
    }
    return next(event, state);
  };
};