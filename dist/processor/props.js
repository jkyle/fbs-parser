'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passage, state) {
  return (0, _text2.default)(passage)(state);
};