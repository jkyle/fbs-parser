'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (next, select) {
  return function (event, state) {
    var newState = next(event, state);
    if (newState === state && event.type !== 'START') {
      return select('$BUFFER').add("Nothing happens.")(state);
    }
    return newState;
  };
};