#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fbs = require('./fbs');

var _fbs2 = _interopRequireDefault(_fbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fs3.default);
var dir = process.cwd();
_commander2.default.version('0.0.1').option('-i, --input [dir]', 'Input directory').option('-o, --output [dir]', 'Output directory').parse(process.argv);

var writeFiles = function writeFiles(state, program) {
  return _bluebird2.default.all([fs.writeFileAsync(_path2.default.resolve(dir + '/' + (program.output || 'build') + '/state.json'), JSON.stringify(state)), fs.writeFileAsync(_path2.default.resolve(dir + '/' + (program.output || 'build') + '/program.json'), JSON.stringify(program))]);
};

(0, _fbs2.default)(_path2.default.resolve(dir + '/' + (program.input || 'game-objects'))).then(function (_ref) {
  var state = _ref.state,
      program = _ref.program;
  return writeFiles(state, program);
});