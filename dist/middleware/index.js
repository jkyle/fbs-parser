'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.clear = exports.nothing = exports.go = exports.take = exports.look = undefined;

var _look = require('./look');

var _look2 = _interopRequireDefault(_look);

var _take = require('./take');

var _take2 = _interopRequireDefault(_take);

var _go = require('./go');

var _go2 = _interopRequireDefault(_go);

var _nothingHappens = require('./nothing-happens');

var _nothingHappens2 = _interopRequireDefault(_nothingHappens);

var _clearBuffer = require('./clear-buffer');

var _clearBuffer2 = _interopRequireDefault(_clearBuffer);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.look = _look2.default;
exports.take = _take2.default;
exports.go = _go2.default;
exports.nothing = _nothingHappens2.default;
exports.clear = _clearBuffer2.default;
exports.start = _start2.default;
exports.default = [_clearBuffer2.default, _start2.default, _nothingHappens2.default, _look2.default, _go2.default, _take2.default];