'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var prepositions = ['ON', 'IN', 'INTO', 'AT', 'TO'];

/* This is gross, but whatevs */

var parse = function parse(input) {
  var _input$toUpperCase$sp = input.toUpperCase().split(' ').filter(function (i) {
    return i;
  }).filter(function (i) {
    return i !== 'THE';
  }).filter(function (i) {
    return i !== 'A';
  }).filter(function (i) {
    return i !== 'AN';
  }),
      _input$toUpperCase$sp2 = _toArray(_input$toUpperCase$sp),
      event = _input$toUpperCase$sp2[0],
      rest = _input$toUpperCase$sp2.slice(1);

  var matches = prepositions.map(function (prep) {
    var idx = rest.indexOf(prep);
    return idx > -1 ? [rest.slice(0, idx).join(' '), rest.slice(idx + 1).join(' ')] : [];
  }).filter(function (arr) {
    return arr.length > 0;
  });

  var match = matches[0]; // greedy with first match if there are multiple
  if (match) {
    var _match = _slicedToArray(match, 2),
        first = _match[0],
        second = _match[1];

    if (first.length > 0) {
      return {
        type: event,
        subject: first,
        target: second
      };
    }
    return {
      type: event,
      subject: second
    };
  }

  return {
    type: event,
    subject: rest.join(' ')
  };
};

exports.default = parse;