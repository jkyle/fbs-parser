'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _selectors = require('../selectors');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var has = function has(object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

var addItemToObject = function addItemToObject(game, objectId, itemId) {
  var subject = game.objects[objectId];
  var target = game.objects[itemId];
  if (subject.type === 'LOCATION' && target.type === 'LOCATION') {
    return addExitToObject(game, objectId, itemId);
  }
  var collection = game.objects[objectId].items || [];
  var items = collection.indexOf(itemId) < 0 ? [].concat(_toConsumableArray(collection), [itemId]) : collection;
  return setPropertyForObject(game, ['objects', objectId, 'items'], items);
};

var addExitToObject = function addExitToObject(game, subjectId, destinationId) {
  var collection = game.objects[subjectId].exits || [];
  var exits = collection.indexOf(destinationId) < 0 ? [].concat(_toConsumableArray(collection), [destinationId]) : collection;
  return setPropertyForObject(game, ['objects', subjectId, 'exits'], exits);
};

var removeItemFromObject = function removeItemFromObject(game, objectId, itemId) {
  var collection = game.objects[objectId].items || [];
  var items = collection.indexOf(itemId) < 0 ? collection : collection.filter(function (item) {
    return item !== itemId;
  });
  return setPropertyForObject(game, ['objects', objectId, 'items'], items);
};

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

var getPropsArray = function getPropsArray(id, props, getItems) {
  return props.length > 0 ? ['objects', id].concat(_toConsumableArray(props)) : getItems ? ['objects', id, 'items'] : ['objects', id, 'id'];
};

module.exports = {
  addItem: function addItem(object, item) {
    return function (game, thisObj, targetObj) {
      // CUSTOM HANDLING FOR TYPES
      var id = object.type === '$INVENTORY' ? 'PLAYER' : object.type === '$LOCATION' ? game.locaction : object.type === '$THIS' ? thisObj : object.type === '$TARGET' ? targetObj : object.id;
      var itemId = item.type === '$INVENTORY' ? 'PLAYER' : item.type === '$LOCATION' ? game.locaction : item.type === '$THIS' ? thisObj : item.type === '$TARGET' ? targetObj : item.id;
      return addItemToObject(game, id, itemId);
    };
  },
  addExit: function addExit(location, destination) {
    return function (game, thisObj, targetObj) {
      return addExitToObject(game, location.id, destination.id);
    };
  },
  removeItem: function removeItem(object, item) {
    return function (game, thisObj, targetObj) {
      var id = object.type === '$INVENTORY' ? 'PLAYER' : object.type === '$LOCATION' ? game.location : object.type === '$THIS' ? thisObj : object.type === '$TARGET' ? targetObj : object.id;

      var itemId = item.type === '$INVENTORY' ? 'PLAYER' : item.type === '$LOCATION' ? game.location : item.type === '$THIS' ? thisObj : item.type === '$TARGET' ? targetObj : item.id;
      return removeItemFromObject(game, id, itemId);
    };
  }
};