'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (program) {
  var exe = Object.keys(program).reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, (0, _file2.default)(program[key])));
  }, {});
  return function (next) {
    return function (event, state) {
      var legitEvent = exe[event.subject] && exe[event.subject][event.type];
      return next(event, legitEvent ? legitEvent(state, event.subject, event.target) : state);
    };
  };
};