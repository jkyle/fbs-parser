'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (next, select) {
  return function (event, state) {
    return event.type === 'START' ? next(event, state) : next(event, select('$BUFFER', state).set([]));
  };
};