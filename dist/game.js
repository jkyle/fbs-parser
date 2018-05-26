'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inputParser = require('./input-parser');

var _inputParser2 = _interopRequireDefault(_inputParser);

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _selectors.setSelector)({
  $LOCATION: ['$OBJECTS', ['$GLOBAL', 'location']],
  $OBJECTS: ['objects'],
  $GLOBAL: [],
  $BUFFER: ['buffer'],
  $PLAYER: ['PLAYER'],
  $INVENTORY: ['$PLAYER', 'items']
});

var noop = function noop(event, state) {
  return state;
};

var composeMiddleware = function composeMiddleware() {
  var middleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return middleware.length > 0 ? middleware.reverse().reduce(function (acc, fn) {
    return function () {
      return fn(acc.apply(undefined, arguments), _selectors.select);
    };
  })(noop) : noop;
};

exports.default = function (initialState, middleware) {
  var processEvent = composeMiddleware(middleware);
  var subscribers = [];
  var state = initialState;

  return {
    subscribe: function subscribe(cb) {
      subscribers.push(cb);cb(state);
    },
    dispatch: function dispatch(input) {
      var action = typeof input === 'string' ? (0, _inputParser2.default)(input) : input;
      state = processEvent(action, state);
      subscribers.forEach(function (cb) {
        return cb(state);
      });
    },
    getState: function getState() {
      return _extends({}, state);
    }
  };
};