'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _properties = require('./properties');

var _expressions = require('./expressions');

var _expressions2 = _interopRequireDefault(_expressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comparators = {
  '===': function _(left, right) {
    return left === right;
  },
  '>': function _(left, right) {
    return left > right;
  },
  '<': function _(left, right) {
    return left < right;
  },
  '>=': function _(left, right) {
    return left >= right;
  },
  '<=': function _(left, right) {
    return left <= right;
  },
  '!==': function _(left, right) {
    return left !== right;
  },
  has: function has(left, right) {
    return left.indexOf(right) > -1;
  },
  lacks: function lacks(left, right) {
    return left.indexOf(right) < 0;
  }
};

var getValue = function getValue(item, getItems) {
  if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
    return function (game) {
      return item;
    };
  }
  return (0, _properties.getProperty)(item, getItems);
};

var evaluateCondition = function evaluateCondition(condition) {
  var operator = condition.operator;
  var left = void 0,
      right = void 0;
  if (operator === 'has' || operator === 'lacks') {
    left = getValue(condition.left, true);
  } else {
    left = getValue(condition.left);
  }
  right = (0, _expressions2.default)(condition.right);
  return function (game, thisObj, targetObj) {
    return comparators[operator](left(game, thisObj, targetObj), right(game, thisObj, targetObj));
  };
};

module.exports = evaluateCondition;