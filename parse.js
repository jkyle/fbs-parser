var grammar = require("./file.js");
var fs = require("fs");
var nearley = require("nearley");

// Create a Parser object from our grammar.
var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

// Parse something
fs.readFile('./demo_text.fbs', 'utf8', (err, file) => {
  const parsed = p.feed(file).results[0]
  fs.writeFile('./parsed.js', `module.exports = ${JSON.stringify(parsed, null, 2)}`, (err) => console.log('err', err))
})
// p.results --> [ ["sum", "1", "1"] ]
