"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
    function id(x) {
        return x[0];
    }
    var grammar = {
        Lexer: undefined,
        ParserRules: [{ "name": "comment", "symbols": [{ "literal": "#" }, "commentchars"] }, { "name": "commentchars", "symbols": [] }, { "name": "commentchars", "symbols": ["commentchars", /[^\n]/] }, { "name": "primative$subexpression$1", "symbols": ["string"] }, { "name": "primative$subexpression$1", "symbols": ["number"] }, { "name": "primative$subexpression$1", "symbols": ["boolean"] }, { "name": "primative", "symbols": ["primative$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "primative_no_num$subexpression$1", "symbols": ["string"] }, { "name": "primative_no_num$subexpression$1", "symbols": ["boolean"] }, { "name": "primative_no_num", "symbols": ["primative_no_num$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "string$ebnf$1", "symbols": ["safechar"] }, { "name": "string$ebnf$1", "symbols": ["string$ebnf$1", "safechar"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "string", "symbols": ["quote", "string$ebnf$1", "quote"], "postprocess": function postprocess(d) {
                return d[1].join('');
            } }, { "name": "safechar_no_ws", "symbols": ["quote"], "postprocess": function postprocess(d) {
                return "\\" + d[0];
            } }, { "name": "safechar_no_ws", "symbols": ["tick"], "postprocess": id }, { "name": "safechar_no_ws", "symbols": ["alpha"], "postprocess": id }, { "name": "safechar_no_ws", "symbols": ["punctuation"], "postprocess": id }, { "name": "safechar_no_ws", "symbols": ["lbrace"], "postprocess": id }, { "name": "safechar_no_ws", "symbols": ["rbrace"], "postprocess": id }, { "name": "safechar", "symbols": ["quote"], "postprocess": function postprocess(d) {
                return "\\" + d[0];
            } }, { "name": "safechar", "symbols": ["tick"], "postprocess": id }, { "name": "safechar", "symbols": ["alpha"], "postprocess": id }, { "name": "safechar", "symbols": ["ws"], "postprocess": id }, { "name": "safechar", "symbols": ["punctuation"], "postprocess": id }, { "name": "safechar", "symbols": ["lbrace"], "postprocess": id }, { "name": "safechar", "symbols": ["rbrace"], "postprocess": id }, { "name": "quote", "symbols": [{ "literal": "\"" }], "postprocess": id }, { "name": "lbrace$string$1", "symbols": [{ "literal": "\\" }, { "literal": "{" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lbrace", "symbols": ["lbrace$string$1"], "postprocess": function postprocess(d) {
                return '\{';
            } }, { "name": "rbrace$string$1", "symbols": [{ "literal": "\\" }, { "literal": "}" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "rbrace", "symbols": ["rbrace$string$1"], "postprocess": function postprocess(d) {
                return '\}';
            } }, { "name": "tick", "symbols": [{ "literal": "'" }], "postprocess": id }, { "name": "alpha", "symbols": [/[a-zA-Z0-9]/], "postprocess": id }, { "name": "punctuation", "symbols": [/[.?!,$%*#()[\]]/], "postprocess": id }, { "name": "ws", "symbols": [{ "literal": " " }] }, { "name": "number", "symbols": ["integer"], "postprocess": id }, { "name": "number", "symbols": ["float"], "postprocess": id }, { "name": "integer$ebnf$1", "symbols": [/[0-9]/] }, { "name": "integer$ebnf$1", "symbols": ["integer$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "integer", "symbols": ["negative", "integer$ebnf$1"], "postprocess": function postprocess(d) {
                return parseInt(d[0] + d[1].join(''));
            } }, { "name": "float$ebnf$1", "symbols": [/[0-9]/] }, { "name": "float$ebnf$1", "symbols": ["float$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "float$ebnf$2", "symbols": [/[0-9]/] }, { "name": "float$ebnf$2", "symbols": ["float$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "float", "symbols": ["negative", "float$ebnf$1", { "literal": "." }, "float$ebnf$2"], "postprocess": function postprocess(d) {
                return parseFloat("" + d[0] + d[1].join('') + "." + d[3].join(''));
            } }, { "name": "negative$ebnf$1", "symbols": [{ "literal": "-" }], "postprocess": id }, { "name": "negative$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "negative", "symbols": ["negative$ebnf$1"], "postprocess": function postprocess(d) {
                return d[0] ? "-" : "";
            } }, { "name": "boolean$string$1", "symbols": [{ "literal": "t" }, { "literal": "r" }, { "literal": "u" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "boolean", "symbols": ["boolean$string$1"], "postprocess": function postprocess(d) {
                return true;
            } }, { "name": "boolean$string$2", "symbols": [{ "literal": "f" }, { "literal": "a" }, { "literal": "l" }, { "literal": "s" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "boolean", "symbols": ["boolean$string$2"], "postprocess": function postprocess(d) {
                return false;
            } }, { "name": "_$ebnf$1", "symbols": [/[ ]/] }, { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": null }, { "name": "__$ebnf$1", "symbols": [] }, { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function postprocess(d) {
                return d[0].length ? ' ' : '';
            } }, { "name": "game_object", "symbols": ["name", "props"], "postprocess": function postprocess(d) {
                return { type: "$GAME_OBJECT", id: d[0], props: d[1] };
            } }, { "name": "game_object", "symbols": [{ "literal": "$" }, "name", "props"], "postprocess": function postprocess(d) {
                return { type: "$" + d[1], props: d[2] };
            } }, { "name": "name$ebnf$1", "symbols": [/[A-Z]/] }, { "name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "name", "symbols": ["name$ebnf$1"], "postprocess": function postprocess(d) {
                return d[0].join('');
            } }, { "name": "name$ebnf$2", "symbols": [/[A-Z ]/] }, { "name": "name$ebnf$2", "symbols": ["name$ebnf$2", /[A-Z ]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "name", "symbols": [{ "literal": "<" }, "name$ebnf$2", { "literal": ">" }], "postprocess": function postprocess(d) {
                return d[1].join('');
            } }, { "name": "props$ebnf$1", "symbols": [] }, { "name": "props$ebnf$1$subexpression$1", "symbols": ["prop"] }, { "name": "props$ebnf$1$subexpression$1", "symbols": ["sProp"] }, { "name": "props$ebnf$1", "symbols": ["props$ebnf$1", "props$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "props", "symbols": ["props$ebnf$1"], "postprocess": function postprocess(d) {
                return d[0].map(function (e) {
                    return e[0];
                });
            } }, { "name": "prop$ebnf$1", "symbols": [/[a-zA-Z]/] }, { "name": "prop$ebnf$1", "symbols": ["prop$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "prop", "symbols": [{ "literal": "." }, "prop$ebnf$1"], "postprocess": function postprocess(d) {
                return d[1].join('');
            } }, { "name": "sProp$ebnf$1", "symbols": [/[a-zA-Z ]/] }, { "name": "sProp$ebnf$1", "symbols": ["sProp$ebnf$1", /[a-zA-Z ]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "sProp", "symbols": [{ "literal": "." }, { "literal": "<" }, "sProp$ebnf$1", { "literal": ">" }], "postprocess": function postprocess(d) {
                return d[2].join('');
            } }, { "name": "expression", "symbols": ["AddSub"], "postprocess": id }, { "name": "Paren", "symbols": [{ "literal": "(" }, "__", "AddSub", "__", { "literal": ")" }], "postprocess": function postprocess(d) {
                return d[2];
            } }, { "name": "Paren", "symbols": ["value"], "postprocess": id }, { "name": "MulDivMod", "symbols": ["MulDivMod", "__", "mulDivModOp", "__", "Paren"], "postprocess": function postprocess(d) {
                return { left: d[0], operator: d[2], right: d[4] };
            } }, { "name": "MulDivMod", "symbols": ["Paren"], "postprocess": id }, { "name": "AddSub", "symbols": ["AddSub", "__", "addSubOp", "__", "MulDivMod"], "postprocess": function postprocess(d) {
                return { left: d[0], operator: d[2], right: d[4] };
            } }, { "name": "AddSub", "symbols": ["MulDivMod"], "postprocess": id }, { "name": "value$subexpression$1", "symbols": ["number"] }, { "name": "value$subexpression$1", "symbols": ["game_object"] }, { "name": "value$subexpression$1", "symbols": ["string"] }, { "name": "value", "symbols": ["value$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "mulDivModOp$subexpression$1", "symbols": ["mul"] }, { "name": "mulDivModOp$subexpression$1", "symbols": ["div"] }, { "name": "mulDivModOp$subexpression$1", "symbols": ["mod"] }, { "name": "mulDivModOp", "symbols": ["mulDivModOp$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "addSubOp$subexpression$1", "symbols": ["plus"] }, { "name": "addSubOp$subexpression$1", "symbols": ["minus"] }, { "name": "addSubOp", "symbols": ["addSubOp$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "plus", "symbols": [{ "literal": "+" }], "postprocess": id }, { "name": "minus", "symbols": [{ "literal": "-" }], "postprocess": id }, { "name": "mul", "symbols": [{ "literal": "*" }], "postprocess": id }, { "name": "div", "symbols": [{ "literal": "/" }], "postprocess": id }, { "name": "mod", "symbols": [{ "literal": "%" }], "postprocess": id }, { "name": "condition", "symbols": ["left", "_", "comparator", "_", "right"], "postprocess": function postprocess(d) {
                return { left: d[0], operator: d[2], right: d[4] };
            } }, { "name": "left", "symbols": ["game_object"], "postprocess": id }, { "name": "right", "symbols": ["expression_or_primative"], "postprocess": id }, { "name": "right$string$1", "symbols": [{ "literal": "R" }, { "literal": "A" }, { "literal": "W" }, { "literal": "$" }, { "literal": "T" }, { "literal": "A" }, { "literal": "R" }, { "literal": "G" }, { "literal": "E" }, { "literal": "T" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "right", "symbols": ["right$string$1"], "postprocess": function postprocess(d) {
                return { type: 'RAW_TARGET' };
            } }, { "name": "comparator$subexpression$1", "symbols": ["eq"] }, { "name": "comparator$subexpression$1", "symbols": ["ne"] }, { "name": "comparator$subexpression$1", "symbols": ["lt"] }, { "name": "comparator$subexpression$1", "symbols": ["lte"] }, { "name": "comparator$subexpression$1", "symbols": ["gt"] }, { "name": "comparator$subexpression$1", "symbols": ["gte"] }, { "name": "comparator$subexpression$1", "symbols": ["has"] }, { "name": "comparator$subexpression$1", "symbols": ["lacks"] }, { "name": "comparator", "symbols": ["comparator$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "eq$subexpression$1", "symbols": [{ "literal": "=" }] }, { "name": "eq$subexpression$1$string$1", "symbols": [{ "literal": "=" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$1"] }, { "name": "eq$subexpression$1$string$2", "symbols": [{ "literal": "=" }, { "literal": "=" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$2"] }, { "name": "eq$subexpression$1$string$3", "symbols": [{ "literal": "e" }, { "literal": "q" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$3"] }, { "name": "eq$subexpression$1$string$4", "symbols": [{ "literal": "E" }, { "literal": "Q" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$4"] }, { "name": "eq$subexpression$1$string$5", "symbols": [{ "literal": "i" }, { "literal": "s" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$5"] }, { "name": "eq$subexpression$1$string$6", "symbols": [{ "literal": "I" }, { "literal": "S" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "eq$subexpression$1", "symbols": ["eq$subexpression$1$string$6"] }, { "name": "eq", "symbols": ["eq$subexpression$1"], "postprocess": function postprocess(d) {
                return "===";
            } }, { "name": "ne$subexpression$1$string$1", "symbols": [{ "literal": "!" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$1"] }, { "name": "ne$subexpression$1$string$2", "symbols": [{ "literal": "!" }, { "literal": "=" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$2"] }, { "name": "ne$subexpression$1$string$3", "symbols": [{ "literal": "n" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$3"] }, { "name": "ne$subexpression$1$string$4", "symbols": [{ "literal": "N" }, { "literal": "E" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$4"] }, { "name": "ne$subexpression$1$string$5", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$5"] }, { "name": "ne$subexpression$1$string$6", "symbols": [{ "literal": "N" }, { "literal": "O" }, { "literal": "T" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "ne$subexpression$1", "symbols": ["ne$subexpression$1$string$6"] }, { "name": "ne", "symbols": ["ne$subexpression$1"], "postprocess": function postprocess(d) {
                return "!==";
            } }, { "name": "lt$subexpression$1", "symbols": [{ "literal": "<" }] }, { "name": "lt$subexpression$1$string$1", "symbols": [{ "literal": "l" }, { "literal": "t" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lt$subexpression$1", "symbols": ["lt$subexpression$1$string$1"] }, { "name": "lt$subexpression$1$string$2", "symbols": [{ "literal": "L" }, { "literal": "T" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lt$subexpression$1", "symbols": ["lt$subexpression$1$string$2"] }, { "name": "lt", "symbols": ["lt$subexpression$1"], "postprocess": function postprocess(d) {
                return "<";
            } }, { "name": "lte$subexpression$1$string$1", "symbols": [{ "literal": "<" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lte$subexpression$1", "symbols": ["lte$subexpression$1$string$1"] }, { "name": "lte$subexpression$1$string$2", "symbols": [{ "literal": "l" }, { "literal": "t" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lte$subexpression$1", "symbols": ["lte$subexpression$1$string$2"] }, { "name": "lte$subexpression$1$string$3", "symbols": [{ "literal": "L" }, { "literal": "T" }, { "literal": "E" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lte$subexpression$1", "symbols": ["lte$subexpression$1$string$3"] }, { "name": "lte", "symbols": ["lte$subexpression$1"], "postprocess": function postprocess(d) {
                return "<=";
            } }, { "name": "gt$subexpression$1", "symbols": [{ "literal": ">" }] }, { "name": "gt$subexpression$1$string$1", "symbols": [{ "literal": "g" }, { "literal": "t" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "gt$subexpression$1", "symbols": ["gt$subexpression$1$string$1"] }, { "name": "gt$subexpression$1$string$2", "symbols": [{ "literal": "G" }, { "literal": "T" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "gt$subexpression$1", "symbols": ["gt$subexpression$1$string$2"] }, { "name": "gt", "symbols": ["gt$subexpression$1"], "postprocess": function postprocess(d) {
                return ">";
            } }, { "name": "gte$subexpression$1$string$1", "symbols": [{ "literal": ">" }, { "literal": "=" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "gte$subexpression$1", "symbols": ["gte$subexpression$1$string$1"] }, { "name": "gte$subexpression$1$string$2", "symbols": [{ "literal": "g" }, { "literal": "t" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "gte$subexpression$1", "symbols": ["gte$subexpression$1$string$2"] }, { "name": "gte$subexpression$1$string$3", "symbols": [{ "literal": "G" }, { "literal": "T" }, { "literal": "E" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "gte$subexpression$1", "symbols": ["gte$subexpression$1$string$3"] }, { "name": "gte", "symbols": ["gte$subexpression$1"], "postprocess": function postprocess(d) {
                return ">=";
            } }, { "name": "has$subexpression$1$string$1", "symbols": [{ "literal": "h" }, { "literal": "a" }, { "literal": "s" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$1"] }, { "name": "has$subexpression$1$string$2", "symbols": [{ "literal": "H" }, { "literal": "A" }, { "literal": "S" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$2"] }, { "name": "has$subexpression$1$string$3", "symbols": [{ "literal": "c" }, { "literal": "o" }, { "literal": "n" }, { "literal": "t" }, { "literal": "a" }, { "literal": "i" }, { "literal": "n" }, { "literal": "s" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$3"] }, { "name": "has$subexpression$1$string$4", "symbols": [{ "literal": "C" }, { "literal": "O" }, { "literal": "N" }, { "literal": "T" }, { "literal": "A" }, { "literal": "I" }, { "literal": "N" }, { "literal": "S" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$4"] }, { "name": "has$subexpression$1$string$5", "symbols": [{ "literal": "i" }, { "literal": "n" }, { "literal": "c" }, { "literal": "l" }, { "literal": "u" }, { "literal": "d" }, { "literal": "e" }, { "literal": "s" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$5"] }, { "name": "has$subexpression$1$string$6", "symbols": [{ "literal": "I" }, { "literal": "N" }, { "literal": "C" }, { "literal": "L" }, { "literal": "U" }, { "literal": "D" }, { "literal": "E" }, { "literal": "S" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "has$subexpression$1", "symbols": ["has$subexpression$1$string$6"] }, { "name": "has", "symbols": ["has$subexpression$1"], "postprocess": function postprocess(d) {
                return "has";
            } }, { "name": "lacks$subexpression$1$string$1", "symbols": [{ "literal": "l" }, { "literal": "a" }, { "literal": "c" }, { "literal": "k" }, { "literal": "s" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lacks$subexpression$1", "symbols": ["lacks$subexpression$1$string$1"] }, { "name": "lacks$subexpression$1$string$2", "symbols": [{ "literal": "L" }, { "literal": "A" }, { "literal": "C" }, { "literal": "K" }, { "literal": "S" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "lacks$subexpression$1", "symbols": ["lacks$subexpression$1$string$2"] }, { "name": "lacks", "symbols": ["lacks$subexpression$1"], "postprocess": function postprocess(d) {
                return "lacks";
            } }, { "name": "passage$ebnf$1", "symbols": [] }, { "name": "passage$ebnf$1", "symbols": ["passage$ebnf$1", { "literal": "\n" }], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "passage$ebnf$2", "symbols": [] }, { "name": "passage$ebnf$2$subexpression$1$ebnf$1", "symbols": [{ "literal": "\n" }] }, { "name": "passage$ebnf$2$subexpression$1$ebnf$1", "symbols": ["passage$ebnf$2$subexpression$1$ebnf$1", { "literal": "\n" }], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "passage$ebnf$2$subexpression$1", "symbols": [{ "literal": "\n" }, "passage$ebnf$2$subexpression$1$ebnf$1", "paragraph"] }, { "name": "passage$ebnf$2", "symbols": ["passage$ebnf$2", "passage$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "passage$ebnf$3", "symbols": [] }, { "name": "passage$ebnf$3", "symbols": ["passage$ebnf$3", { "literal": "\n" }], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "passage", "symbols": ["passage$ebnf$1", "paragraph", "passage$ebnf$2", "passage$ebnf$3"], "postprocess": function postprocess(d) {
                return { paragraphs: [d[1]].concat(_toConsumableArray(d[2].map(function (e) {
                        return e[2];
                    }))) };
            } }, { "name": "paragraph$ebnf$1", "symbols": [] }, { "name": "paragraph$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "line"] }, { "name": "paragraph$ebnf$1", "symbols": ["paragraph$ebnf$1", "paragraph$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "paragraph", "symbols": ["line", "paragraph$ebnf$1"], "postprocess": function postprocess(d) {
                return { lines: [d[0]].concat(_toConsumableArray(d[1].map(function (e) {
                        return e[1];
                    }))) };
            } }, { "name": "line", "symbols": ["__", "first_token", "__"], "postprocess": function postprocess(d) {
                return { tokens: d[1] };
            } }, { "name": "first_token", "symbols": ["condition_token"], "postprocess": id }, { "name": "first_token", "symbols": ["property_token"], "postprocess": id }, { "name": "first_token", "symbols": ["string_token"], "postprocess": id }, { "name": "rest_token", "symbols": ["condition_token"], "postprocess": id }, { "name": "rest_token", "symbols": ["property_token"], "postprocess": id }, { "name": "string_token$ebnf$1", "symbols": [] }, { "name": "string_token$ebnf$1$subexpression$1", "symbols": ["_", "safeToken"] }, { "name": "string_token$ebnf$1", "symbols": ["string_token$ebnf$1", "string_token$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "string_token$ebnf$2", "symbols": ["sp_token_1"], "postprocess": id }, { "name": "string_token$ebnf$2", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "string_token", "symbols": ["safeToken", "string_token$ebnf$1", "string_token$ebnf$2"], "postprocess": function postprocess(d) {
                return [[d[0]].concat(_toConsumableArray(d[1].map(function (e) {
                    return e[1];
                }))).join(' ')].concat(_toConsumableArray(d[2] ? d[2] : []));
            } }, { "name": "condition_token$ebnf$1", "symbols": ["sp_token"], "postprocess": id }, { "name": "condition_token$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "condition_token", "symbols": ["conditional", "condition_token$ebnf$1"], "postprocess": function postprocess(d) {
                return [d[0]].concat(_toConsumableArray(d[1] ? d[1] : []));
            } }, { "name": "property_token$ebnf$1", "symbols": ["sp_token"], "postprocess": id }, { "name": "property_token$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "property_token", "symbols": ["object_property", "property_token$ebnf$1"], "postprocess": function postprocess(d) {
                return [d[0]].concat(_toConsumableArray(d[1] ? d[1] : []));
            } }, { "name": "sp_token_1$subexpression$1", "symbols": ["condition_token"] }, { "name": "sp_token_1$subexpression$1", "symbols": ["property_token"] }, { "name": "sp_token_1", "symbols": ["__", "sp_token_1$subexpression$1"], "postprocess": function postprocess(d) {
                return [d[0]].concat(_toConsumableArray(d[1][0]));
            } }, { "name": "sp_token$subexpression$1", "symbols": ["condition_token"] }, { "name": "sp_token$subexpression$1", "symbols": ["string_token"] }, { "name": "sp_token$subexpression$1", "symbols": ["property_token"] }, { "name": "sp_token", "symbols": ["__", "sp_token$subexpression$1"], "postprocess": function postprocess(d) {
                return [d[0]].concat(_toConsumableArray(d[1][0]));
            } }, { "name": "safeToken$ebnf$1", "symbols": ["safechar_no_ws"] }, { "name": "safeToken$ebnf$1", "symbols": ["safeToken$ebnf$1", "safechar_no_ws"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "safeToken", "symbols": ["safeToken$ebnf$1"], "postprocess": function postprocess(d) {
                return d[0].join('');
            } }, { "name": "conditional$ebnf$1$subexpression$1", "symbols": ["condition_else", "passage"] }, { "name": "conditional$ebnf$1", "symbols": ["conditional$ebnf$1$subexpression$1"], "postprocess": id }, { "name": "conditional$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "conditional", "symbols": ["conditional_start", "passage", "conditional$ebnf$1", "conditional_end"], "postprocess": function postprocess(d) {
                return { type: 'condition', condition: d[0], passage: d[1], elsePassage: d[2] ? d[2][1] : null };
            } }, { "name": "conditional_start$string$1", "symbols": [{ "literal": "{" }, { "literal": "?" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "conditional_start", "symbols": ["conditional_start$string$1", "_", "condition", "__", { "literal": "}" }], "postprocess": function postprocess(d) {
                return d[2];
            } }, { "name": "conditional_end$string$1", "symbols": [{ "literal": "{" }, { "literal": "x" }, { "literal": "}" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "conditional_end", "symbols": ["conditional_end$string$1"], "postprocess": id }, { "name": "condition_else$string$1", "symbols": [{ "literal": "{" }, { "literal": "~" }, { "literal": "}" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "condition_else", "symbols": ["condition_else$string$1"], "postprocess": id }, { "name": "object_property$string$1", "symbols": [{ "literal": "{" }, { "literal": "@" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "object_property", "symbols": ["object_property$string$1", "_", "expression", "__", { "literal": "}" }], "postprocess": function postprocess(d) {
                return d[2];
            } }, { "name": "object_property$string$2", "symbols": [{ "literal": "{" }, { "literal": "@" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "object_property$string$3", "symbols": [{ "literal": "R" }, { "literal": "A" }, { "literal": "W" }, { "literal": "$" }, { "literal": "T" }, { "literal": "A" }, { "literal": "R" }, { "literal": "G" }, { "literal": "E" }, { "literal": "T" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "object_property", "symbols": ["object_property$string$2", "_", "object_property$string$3", "__", { "literal": "}" }], "postprocess": function postprocess(d) {
                return { type: 'RAW_TARGET' };
            } }, { "name": "action", "symbols": [{ "literal": "-" }, "_", "game_object", "_", "operator", "_", "expression_or_primative"], "postprocess": function postprocess(d) {
                return { type: d[4], target: d[2], value: d[6] };
            } }, { "name": "action$ebnf$1$subexpression$1$string$1", "symbols": [{ "literal": "S" }, { "literal": "A" }, { "literal": "Y" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "action$ebnf$1$subexpression$1", "symbols": ["action$ebnf$1$subexpression$1$string$1"] }, { "name": "action$ebnf$1$subexpression$1$string$2", "symbols": [{ "literal": "s" }, { "literal": "a" }, { "literal": "y" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "action$ebnf$1$subexpression$1", "symbols": ["action$ebnf$1$subexpression$1$string$2"] }, { "name": "action$ebnf$1", "symbols": ["action$ebnf$1$subexpression$1"], "postprocess": id }, { "name": "action$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "action$string$1", "symbols": [{ "literal": "(" }, { "literal": "(" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "action$string$2", "symbols": [{ "literal": ")" }, { "literal": ")" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "action", "symbols": [{ "literal": "-" }, "_", "action$ebnf$1", "__", "action$string$1", "passage", "action$string$2"], "postprocess": function postprocess(d) {
                return { type: "say", passage: d[5] };
            } }, { "name": "game_object_or_primative", "symbols": ["game_object"], "postprocess": id }, { "name": "game_object_or_primative", "symbols": ["primative"], "postprocess": id }, { "name": "expression_or_primative", "symbols": ["expression"], "postprocess": id }, { "name": "expression_or_primative", "symbols": ["primative_no_num"], "postprocess": id }, { "name": "operator$subexpression$1", "symbols": ["add"] }, { "name": "operator$subexpression$1", "symbols": ["remove"] }, { "name": "operator$subexpression$1", "symbols": ["set"] }, { "name": "operator", "symbols": ["operator$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "add$string$1", "symbols": [{ "literal": "a" }, { "literal": "d" }, { "literal": "d" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "add", "symbols": ["add$string$1"], "postprocess": id }, { "name": "remove$string$1", "symbols": [{ "literal": "r" }, { "literal": "e" }, { "literal": "m" }, { "literal": "o" }, { "literal": "v" }, { "literal": "e" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "remove", "symbols": ["remove$string$1"], "postprocess": id }, { "name": "set$string$1", "symbols": [{ "literal": "<" }, { "literal": "-" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "set", "symbols": ["set$string$1"], "postprocess": function postprocess(d) {
                return "set";
            } }, { "name": "event_block$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "event_block$ebnf$1", "symbols": ["event_block$ebnf$1$subexpression$1"] }, { "name": "event_block$ebnf$1$subexpression$2", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "event_block$ebnf$1", "symbols": ["event_block$ebnf$1", "event_block$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "event_block", "symbols": ["__", "method", "event_block$ebnf$1"], "postprocess": function postprocess(d) {
                return { method: d[1], actions: d[2].map(function (e) {
                        return e[2];
                    }).filter(function (e) {
                        return e;
                    }) };
            } }, { "name": "event_block", "symbols": ["comment"], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "method$ebnf$1", "symbols": [/[A-Z]/] }, { "name": "method$ebnf$1", "symbols": ["method$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "method$string$1", "symbols": [{ "literal": ">" }, { "literal": ">" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "method", "symbols": ["method$ebnf$1", "_", "method$string$1"], "postprocess": function postprocess(d) {
                return d[0].join('');
            } }, { "name": "condition_block$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "condition_block$ebnf$1", "symbols": ["condition_block$ebnf$1$subexpression$1"] }, { "name": "condition_block$ebnf$1$subexpression$2", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "condition_block$ebnf$1", "symbols": ["condition_block$ebnf$1", "condition_block$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "condition_block$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "condition_block$ebnf$2$subexpression$1$ebnf$1", "symbols": ["condition_block$ebnf$2$subexpression$1$ebnf$1$subexpression$1"] }, { "name": "condition_block$ebnf$2$subexpression$1$ebnf$1$subexpression$2", "symbols": [{ "literal": "\n" }, "__", "doable"] }, { "name": "condition_block$ebnf$2$subexpression$1$ebnf$1", "symbols": ["condition_block$ebnf$2$subexpression$1$ebnf$1", "condition_block$ebnf$2$subexpression$1$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "condition_block$ebnf$2$subexpression$1", "symbols": [{ "literal": "\n" }, "__", "condition_else", "__", "condition_block$ebnf$2$subexpression$1$ebnf$1"] }, { "name": "condition_block$ebnf$2", "symbols": ["condition_block$ebnf$2$subexpression$1"], "postprocess": id }, { "name": "condition_block$ebnf$2", "symbols": [], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "condition_block", "symbols": ["condition_start", "_", "condition", "condition_block$ebnf$1", "condition_block$ebnf$2", { "literal": "\n" }, "__", "condition_end"], "postprocess": function postprocess(d) {
                return { type: "condition",
                    condition: d[2],
                    actions: d[3].map(function (e) {
                        return e[2];
                    }),
                    elseActions: d[4] ? d[4][4].map(function (e) {
                        return e[2];
                    }) : null };
            }
        }, { "name": "condition_start", "symbols": [{ "literal": "?" }] }, { "name": "condition_end", "symbols": [{ "literal": "x" }] }, { "name": "condition_else", "symbols": [{ "literal": "~" }] }, { "name": "doable$subexpression$1", "symbols": ["action"] }, { "name": "doable$subexpression$1", "symbols": ["condition_block"] }, { "name": "doable", "symbols": ["doable$subexpression$1"], "postprocess": function postprocess(d) {
                return d[0][0];
            } }, { "name": "doable", "symbols": ["comment"], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "computed_prop$string$1", "symbols": [{ "literal": "(" }, { "literal": "(" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "computed_prop$string$2", "symbols": [{ "literal": ")" }, { "literal": ")" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "computed_prop", "symbols": [{ "literal": ":" }, "props", "__", "computed_prop$string$1", "passage", "computed_prop$string$2"], "postprocess": function postprocess(d) {
                return _defineProperty({}, d[1][0], d[4]);
            } }, { "name": "files$ebnf$1", "symbols": ["file"] }, { "name": "files$ebnf$1", "symbols": ["files$ebnf$1", "file"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "files", "symbols": ["files$ebnf$1"], "postprocess": id }, { "name": "file$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }] }, { "name": "file$ebnf$1", "symbols": ["file$ebnf$1$subexpression$1"] }, { "name": "file$ebnf$1$subexpression$2", "symbols": [{ "literal": "\n" }] }, { "name": "file$ebnf$1", "symbols": ["file$ebnf$1", "file$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "file$ebnf$2$subexpression$1", "symbols": [{ "literal": "\n" }] }, { "name": "file$ebnf$2", "symbols": ["file$ebnf$2$subexpression$1"] }, { "name": "file$ebnf$2$subexpression$2", "symbols": [{ "literal": "\n" }] }, { "name": "file$ebnf$2", "symbols": ["file$ebnf$2", "file$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "file$ebnf$3", "symbols": [] }, { "name": "file$ebnf$3$subexpression$1", "symbols": [{ "literal": "\n" }] }, { "name": "file$ebnf$3", "symbols": ["file$ebnf$3", "file$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "file", "symbols": ["fileType", { "literal": " " }, "fileName", "file$ebnf$1", "computed_props", "file$ebnf$2", "events", "file$ebnf$3"], "postprocess": function postprocess(d) {
                return { type: d[0], id: d[2], props: d[4], events: d[6] };
            } }, { "name": "fileType$ebnf$1", "symbols": [/[A-Z]/] }, { "name": "fileType$ebnf$1", "symbols": ["fileType$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "fileType", "symbols": [{ "literal": "@" }, "fileType$ebnf$1"], "postprocess": function postprocess(d) {
                return d[1].join('');
            } }, { "name": "fileName$ebnf$1", "symbols": [/[A-Z]/] }, { "name": "fileName$ebnf$1", "symbols": ["fileName$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "fileName$ebnf$2", "symbols": [] }, { "name": "fileName$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[A-Z]/] }, { "name": "fileName$ebnf$2$subexpression$1$ebnf$1", "symbols": ["fileName$ebnf$2$subexpression$1$ebnf$1", /[A-Z]/], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "fileName$ebnf$2$subexpression$1", "symbols": [{ "literal": " " }, "fileName$ebnf$2$subexpression$1$ebnf$1"] }, { "name": "fileName$ebnf$2", "symbols": ["fileName$ebnf$2", "fileName$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "fileName", "symbols": ["fileName$ebnf$1", "fileName$ebnf$2"], "postprocess": function postprocess(d) {
                return [d[0].join('')].concat(_toConsumableArray(d[1].map(function (e) {
                    return e[1].join('');
                }))).join(' ');
            } }, { "name": "computed_props", "symbols": [] }, { "name": "computed_props$ebnf$1", "symbols": [] }, { "name": "computed_props$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "computed_prop"] }, { "name": "computed_props$ebnf$1", "symbols": ["computed_props$ebnf$1", "computed_props$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "computed_props", "symbols": ["computed_prop", "computed_props$ebnf$1"], "postprocess": function postprocess(d) {
                return Object.assign({}, d[0], d[1].reduce(function (acc, e) {
                    return Object.assign({}, acc, e[1]);
                }, {}));
            } }, { "name": "events$ebnf$1", "symbols": [] }, { "name": "events$ebnf$1$subexpression$1$ebnf$1", "symbols": [{ "literal": "\n" }] }, { "name": "events$ebnf$1$subexpression$1$ebnf$1", "symbols": ["events$ebnf$1$subexpression$1$ebnf$1", { "literal": "\n" }], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "events$ebnf$1$subexpression$1", "symbols": [{ "literal": "\n" }, "events$ebnf$1$subexpression$1$ebnf$1", "event_block"] }, { "name": "events$ebnf$1", "symbols": ["events$ebnf$1", "events$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "events", "symbols": ["event_block", "events$ebnf$1"], "postprocess": function postprocess(d) {
                return [d[0]].concat(_toConsumableArray(d[1].map(function (e) {
                    return e[2];
                }).filter(function (e) {
                    return e;
                })));
            } }],
        ParserStart: "files"
    };
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = grammar;
    } else {
        window.grammar = grammar;
    }
})();