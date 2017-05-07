'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMiddleware = exports.processor = exports.createGame = undefined;

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createGame = _game2.default;
exports.processor = _processor2.default;
exports.defaultMiddleware = _middleware2.default;