'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _properties = require('./properties');

var _conditionals = require('./conditionals');

var _conditionals2 = _interopRequireDefault(_conditionals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comparators = {
  '===': function _(left, right) {
    return left === right;
  },
  '>': function _(left, right) {
    return left > right;
  }
};

var getValue = function getValue(item) {
  if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
    return function (game) {
      return item.value;
    };
  }
  return (0, _properties.getProperty)(item);
};

var conditionToken = function conditionToken(token) {
  var condition = token.condition,
      passage = token.passage;

  var passageFn = parsePassage(passage);
  var conditionFn = (0, _conditionals2.default)(condition);
  return function (game, thisObj, targetObj) {
    if (conditionFn(game, thisObj, targetObj)) {
      return passageFn(game, thisObj, targetObj);
    } else {
      return '';
    }
  };
};

var propertyToken = function propertyToken(token) {
  var access = (0, _properties.getProperty)(token);
  return function (game, thisObj, targetObj) {
    return access(game, thisObj, targetObj);
  };
};

var parseToken = function parseToken(token) {
  if (typeof token === 'string') {
    return function (game, thisObj, targetObj) {
      return token;
    };
  } else if (token.type === 'condition') {
    var stringFn = conditionToken(token);
    return function (game, thisObj, targetObj) {
      return stringFn(game, thisObj, targetObj);
    };
  } else {
    // Assume it's a game object?
    var _stringFn = (0, _properties.getProperty)(token);
    return function (game, thisObj, targetObj) {
      return _stringFn(game, thisObj, targetObj);
    };
  }
};

var parseLine = function parseLine(line) {
  var tokens = line.tokens.map(parseToken);
  return function (game, thisObj, targetObj) {
    return tokens.map(function (t) {
      return t(game, thisObj, targetObj);
    }).join('');
  };
};

var parseParagraph = function parseParagraph(paragraph) {
  var lines = paragraph.lines.map(parseLine);

  return function (game, thisObj, targetObj) {
    return lines.map(function (l) {
      return l(game, thisObj, targetObj);
    }).join(' ');
  };
};

// export default const parsePassage = passage => {
//   const paragraphs = passage.paragraphs.map(parseParagraph)
//   return game => {
//     return paragraphs.map(p => p(game)).join('\n')
//   }
// }

var parsePassage = function parsePassage(passage) {
  var paragraphs = passage.paragraphs.map(parseParagraph);
  return function (game, thisObj, targetObj) {
    return paragraphs.map(function (p) {
      return p(game, thisObj, targetObj);
    }).join('\n');
  };
};

module.exports = parsePassage;