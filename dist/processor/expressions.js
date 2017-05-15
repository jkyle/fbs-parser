'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _properties = require('./properties');

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
    return function (game, select, thisObj, targetObj) {
      return expressionFn(game, select, thisObj, targetObj);
    };
  } else if (operand.type && operand.type === 'RAW_TARGET') {
    return function (game, select, thisObj, targetObj) {
      return targetObj;
    };
  } else if (operand.type && operand.type) {
    var propfn = (0, _properties.getProperty)(operand);
    return function (game, select, thisObj, targetObj) {
      return propfn(game, select, thisObj, targetObj);
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
  return function (game, select, thisObj, targetObj) {
    var l = leftFn(game, select, thisObj, targetObj);
    var r = rightFn(game, select, thisObj, targetObj);
    return operators[operator](l, r);
  };
};

exports.default = processOperand;