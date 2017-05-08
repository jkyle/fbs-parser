'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (state) {
  var arr = ['objects', state.location];
  var location = (0, _util.getPropertyFromObject)(state, arr);

  var addItem = function addItem(item) {
    var newItems = location.items.indexOf(item) > -1 ? [].concat(_toConsumableArray(location.items), [item]) : location.items;
    return (0, _util.setPropertyForObject)(state, [].concat(arr, ['items']), newItems);
  };

  var removeItem = function removeItem(item) {
    var newItems = location.items.filter(function (i) {
      return i !== item;
    });
    return (0, _util.setPropertyForObject)(state, [].concat(arr, ['items']), newItems);
  };

  var atLocation = function atLocation(item) {
    return location.exits.indexOf(item) > -1 || location.items.indexOf(item) > -1;
  };

  return {
    addItem: addItem,
    removeItem: removeItem,
    atLocation: atLocation
  };
};