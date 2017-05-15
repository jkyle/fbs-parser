'use strict';

var _properties = require('./properties');

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _conditionals = require('./conditionals');

var _conditionals2 = _interopRequireDefault(_conditionals);

var _expressions = require('./expressions');

var _expressions2 = _interopRequireDefault(_expressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var processSet = function processSet(action) {
  var valueFn = (0, _expressions2.default)(action.value);
  return function (game, select, thisObj, targetObj) {
    var value = valueFn(game, select, thisObj, targetObj);
    // const setFn = setProperty(action.target, value)
    // return setFn(game, select, thisObj, targetObj)
    var targetArr = action.target.type === '$GAME_OBJECT' ? [action.target.id].concat(_toConsumableArray(action.target.props)) : action.target.type;
    console.log(targetArr, value);
    return select(targetArr, game).set(value);
  };
};

var processSay = function processSay(action) {
  var sayFn = (0, _text2.default)(action.passage);
  return function (game, select, thisObj, targetObj) {
    return select('$BUFFER', game).add(sayFn(game, select, thisObj, targetObj));
  };
};

var processCondition = function processCondition(action) {
  var conditionFn = (0, _conditionals2.default)(action.condition);
  var actions = processActions(action.actions);
  var elseActions = action.elseActions ? processActions(action.elseActions) : null;
  return function (game, select, thisObj, targetObj) {
    return conditionFn(game, select, thisObj, targetObj) ? actions.reduce(function (acc, actionFn) {
      return actionFn(acc, select, thisObj, targetObj);
    }, game) : elseActions ? elseActions.reduce(function (acc, actionFn) {
      return actionFn(acc, select, thisObj, targetObj);
    }, game) : game;
  };
};

var processAdd = function processAdd(action) {
  var addFn = (0, _properties.addItem)(action.target, action.value);
  return function (game, select, thisObj, targetObj) {
    return addFn(game, select, thisObj, targetObj);
  };
};

var processRemove = function processRemove(action) {
  var addFn = (0, _properties.removeItem)(action.target, action.value);
  return function (game, select, thisObj, targetObj) {
    return addFn(game, select, thisObj, targetObj);
  };
};

var actions = {
  set: processSet,
  say: processSay,
  condition: processCondition,
  add: processAdd,
  remove: processRemove
};

var processAction = function processAction(action) {
  var actionFn = actions[action.type](action);
  return function (game, select, thisObj, targetObj) {
    return actionFn(game, select, thisObj, targetObj);
  };
};

var processActions = function processActions(actions) {
  return actions.map(processAction);
};

module.exports = function (event) {
  var actions = processActions(event.actions);
  return function (game, select, thisObj, targetObj) {
    return actions.reduce(function (acc, actionFn) {
      return actionFn(acc, select, thisObj, targetObj);
    }, game);
  };
};