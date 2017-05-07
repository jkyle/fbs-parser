#!/usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nearley = require('nearley');

var _nearley2 = _interopRequireDefault(_nearley);

var _fbsGrammar = require('./fbs-grammar.js');

var _fbsGrammar2 = _interopRequireDefault(_fbsGrammar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = _bluebird2.default.promisifyAll(_fs3.default);
var dir = process.cwd();
_commander2.default.version('0.0.1').option('-i, --input [dir]', 'Input directory').option('-o, --output [dir]', 'Output directory').parse(process.argv);

var readDir = function readDir(dir) {
  return fs.readdirAsync(dir).then(function (items) {
    return _bluebird2.default.all(items.map(function (item) {
      var file = _path2.default.resolve(dir, item);
      return fs.statAsync(file).then(function (stat) {
        return stat && stat.isDirectory() ? readDir(file) : { item: item, file: file };
      });
    }));
  });
};

var flatten = function flatten(arr) {
  return arr.reduce(function (acc, item) {
    return Array.isArray(item) ? [].concat(_toConsumableArray(acc), _toConsumableArray(flatten(item))) : [].concat(_toConsumableArray(acc), [item]);
  }, []);
};

var parseFile = function parseFile(file) {
  return console.log(file) || fs.readFileAsync(file, 'utf8').then(function (result) {
    var p = new _nearley2.default.Parser(_fbsGrammar2.default.ParserRules, _fbsGrammar2.default.ParserStart);
    p.feed(result);
    return p.results[0][0];
  }).catch(function (e) {
    return console.log('eer', e);
  });
};

var parseFiles = function parseFiles(files) {
  return _bluebird2.default.all(files.map(function (_ref) {
    var file = _ref.file;
    return parseFile(file);
  }));
};

var buildState = function buildState(definition) {
  var global = definition.find(function (item) {
    return item.type === 'GLOBAL';
  });
  var state = { location: undefined, buffer: [] };

  var stateObjects = definition.filter(function (item) {
    return item.type !== 'GLOBAL';
  }).reduce(function (acc, item) {
    return _extends({}, acc, _defineProperty({}, item.id, { id: item.id, type: item.type, properties: {}, items: [], exits: [] }));
  }, {});
  var exe = definition.reduce(function (acc, item) {
    return _extends({}, acc, _defineProperty({}, item.id, item.events));
  }, {});

  state.objects = stateObjects;

  return { state: state, exe: exe };
};

var writeFiles = function writeFiles(state, exe) {
  return _bluebird2.default.all([fs.writeFileAsync(_path2.default.resolve(dir + '/' + (_commander2.default.output || 'build') + '/state.json'), JSON.stringify(state)), fs.writeFileAsync(_path2.default.resolve(dir + '/' + (_commander2.default.output || 'build') + '/program.json'), JSON.stringify(exe))]);
};

readDir(_path2.default.resolve(dir + '/' + (_commander2.default.input || 'game-objects'))).then(flatten).then(parseFiles).then(buildState).then(function (_ref2) {
  var state = _ref2.state,
      exe = _ref2.exe;
  return writeFiles(state, exe);
});