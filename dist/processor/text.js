'use strict';

var _properties = require('./properties');

var _conditionals = require('./conditionals');

var _conditionals2 = _interopRequireDefault(_conditionals);

var _expressions = require('./expressions');

var _expressions2 = _interopRequireDefault(_expressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conditionToken = function conditionToken(token) {
  var condition = token.condition,
      passage = token.passage,
      elsePassage = token.elsePassage;

  var passageFn = parsePassage(passage);
  var conditionFn = (0, _conditionals2.default)(condition);
  var elsePassageFn = elsePassage ? parsePassage(elsePassage) : null;
  return function (game, select, thisObj, targetObj) {
    if (conditionFn(game, select, thisObj, targetObj)) {
      return passageFn(game, select, thisObj, targetObj);
    } else if (elsePassageFn) {
      return elsePassageFn(game, select, thisObj, targetObj);
    } else {
      return '';
    }
  };
};

var parseToken = function parseToken(token) {
  if (typeof token === 'string') {
    return function (game, select, thisObj, targetObj) {
      return token;
    };
  } else if (token.type === 'RAW_TARGET') {
    return function (game, select, thisObj, targetObj) {
      return targetObj;
    };
  } else if (token.type === 'condition') {
    var stringFn = conditionToken(token);
    return function (game, select, thisObj, targetObj) {
      return stringFn(game, select, thisObj, targetObj);
    };
  } else {
    // Assume it's a game object?
    var _stringFn = (0, _expressions2.default)(token);
    return function (game, select, thisObj, targetObj) {
      return _stringFn(game, select, thisObj, targetObj);
    };
  }
};

var parseLine = function parseLine(line) {
  var tokens = line.tokens.map(parseToken);
  return function (game, select, thisObj, targetObj) {
    return tokens.map(function (t) {
      return t(game, select, thisObj, targetObj);
    }).join('');
  };
};

var parseParagraph = function parseParagraph(paragraph) {
  var lines = paragraph.lines.map(parseLine);

  return function (game, select, thisObj, targetObj) {
    return lines.map(function (l) {
      return l(game, select, thisObj, targetObj);
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
  return function (game, select, thisObj, targetObj) {
    return paragraphs.map(function (p) {
      return p(game, select, thisObj, targetObj);
    }).join('\n');
  };
};

module.exports = parsePassage;