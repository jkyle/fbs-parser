"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop(event, state) {
  return state;
};

var composeMiddleware = function composeMiddleware() {
  var middleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return middleware.length > 0 ? middleware.reverse().reduce(function (acc, fn) {
    return function () {
      return fn(acc.apply(undefined, arguments));
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
    dispatch: function dispatch(action) {
      state = processEvent(action, state);
      subscribers.forEach(function (cb) {
        return cb(state);
      });
    }
  };
};