'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arr = ['objects', 'PLAYER', 'items'];

exports.default = function (state) {
  var inv = (0, _util.getPropertyFromObject)(state, arr);

  var add = function add(item) {
    var newInv = inv.indexOf(item) > -1 ? inv : [].concat(_toConsumableArray(inv), [item]);
    return (0, _util.setPropertyForObject)(state, arr, newInv);
  };

  var remove = function remove(item) {
    var newInv = inv.filter(function (i) {
      return i !== item;
    });
    return (0, _util.setPropertyForObject)(state, arr, newInv);
  };

  var find = function find(item) {
    return inv.find(function (i) {
      return i === item;
    });
  };

  var list = function list() {
    return inv;
  };

  return {
    add: add, remove: remove, find: find, list: list
  };
};