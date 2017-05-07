'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var setPropertyForObject = function setPropertyForObject(object, _ref, value) {
  var _ref2 = _toArray(_ref),
      prop = _ref2[0],
      rest = _ref2.slice(1);

  if (rest.length === 0) {
    return _extends({}, object, _defineProperty({}, prop, value));
  }
  var next = _extends({}, object, _defineProperty({}, prop, setPropertyForObject(object[prop] || {}, rest, value)));
  return next;
};

var addToInventory = function addToInventory(item) {
  return function (state) {
    var items = state.objects.PLAYER.items.indexOf(item) < 0 ? [].concat(_toConsumableArray(state.objects.PLAYER.items), [item]) : state.objects.PLAYER.items;
    return setPropertyForObject(state, ['objects', 'PLAYER', 'items'], items);
  };
};

var removeFromLocation = function removeFromLocation(item) {
  return function (state) {
    var collection = state.objects[state.location].items;
    var items = collection.indexOf(item) < 0 ? collection : collection.filter(function (itemName) {
      return itemName !== item;
    });
    return setPropertyForObject(state, ['objects', state.location, 'items'], items);
  };
};

var atLocation = function atLocation(subject, state) {
  return state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1;
};

exports.default = function (next) {
  return function (event, state) {
    if (event.type === 'TAKE') {
      if (!atLocation(event.subject, state)) {
        return _extends({}, state, { buffer: ['There\'s no ' + event.subject + ' here.'].concat(_toConsumableArray(state.buffer)) });
      }

      if (!state.objects[event.subject].properties.takeable) {
        return _extends({}, state, { buffer: ['You can\'t take ' + event.subject + '.'].concat(_toConsumableArray(state.buffer)) });
      }

      var newState = next(event, state);
      if (newState !== state) {
        return newState;
      }
      return _extends({}, [addToInventory(event.subject), removeFromLocation(event.subject)].reduce(function (acc, fn) {
        return fn(acc);
      }, newState), {
        buffer: ['You take ' + event.subject].concat(_toConsumableArray(newState.buffer)) });
    }
    return next(event, state);
  };
};