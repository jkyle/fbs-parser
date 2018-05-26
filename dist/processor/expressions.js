'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selectors = require('../selectors');

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

var operators = {
  '+': function _(left, right) {
    return left + right;
  },
  '-': function _(left, right) {
    return left - right;
  },
  '/': function _(left, right) {
    return left / right;
  },
  '*': function _(left, right) {
    return left * right;
  },
  '%': function _(left, right) {
    return left % right;
  }
};

var processOperand = function processOperand(operand) {
  if (operand.operator) {
    var expressionFn = processExpression(operand);
    return function (game, thisObj, targetObj) {
      return expressionFn(game, thisObj, targetObj);
    };
  } else if (operand.type && operand.type === 'RAW_TARGET') {
    return function (game, thisObj, targetObj) {
      return targetObj;
    };
  } else if (operand.type && operand.type) {
    var propfn = selectFn(operand);
    return function (game, thisObj, targetObj) {
      return propfn(game, thisObj, targetObj).get();
    };
  } else {
    return function () {
      return operand;
    };
  }
};

var processExpression = function processExpression(expression) {
  var left = expression.left,
      operator = expression.operator,
      right = expression.right;

  var leftFn = processOperand(left);
  var rightFn = processOperand(right);
  return function (game, thisObj, targetObj) {
    var l = leftFn(game, thisObj, targetObj);
    var r = rightFn(game, thisObj, targetObj);
    return operators[operator](l, r);
  };
};

exports.default = processOperand;