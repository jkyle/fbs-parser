'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _expressions = require('./expressions');

var _expressions2 = _interopRequireDefault(_expressions);

var _selectors = require('../selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var selectFn = function selectFn(_ref) {
  var type = _ref.type,
      id = _ref.id,
      props = _ref.props;
  return function (state, thisObj, targetObj) {
    var objectLocation = type === '$GAME_OBJECT' ? [id].concat(_toConsumableArray(props)) : type === '$THIS' ? [thisObj].concat(_toConsumableArray(props)) : type === '$TARGET' ? [targetObj].concat(_toConsumableArray(props)) : [type].concat(_toConsumableArray(props));
    return (0, _selectors.select)(objectLocation, state);
  };
};

var selectFnItems = function selectFnItems(_ref2) {
  var type = _ref2.type,
      id = _ref2.id,
      props = _ref2.props;
  return function (state, thisObj, targetObj) {
    var objectLocation = type === '$GAME_OBJECT' ? [id].concat(_toConsumableArray(props), ['items']) : type === '$THIS' ? [thisObj].concat(_toConsumableArray(props), ['items']) : type === '$TARGET' ? [targetObj].concat(_toConsumableArray(props), ['items']) : [type].concat(_toConsumableArray(props), ['items']);
    console.log(objectLocation);
    return (0, _selectors.select)(objectLocation, state);
  };
};

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
      return { get: function get() {
          return item;
        } };
    };
  }
  return getItems ? selectFnItems(item) : selectFn(item);
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
    return comparators[operator](left(game, thisObj, targetObj).get(), right(game, thisObj, targetObj));
  };
};

module.exports = evaluateCondition;