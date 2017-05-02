var grammar = require("./file.js");
var fs = require("fs");
var nearley = require("nearley");

// Create a Parser object from our grammar.
var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

// Parse something
fs.readFile('./demo_text.fbs', 'utf8', (err, file) => {
  const t1 = process.hrtime();
  const results = p.feed(file).results;
  const t2 = process.hrtime(t1);
  console.log(results.length, Math.floor(t2[1]*(1e-6)));
  const parsed = results[0]
  fs.writeFile('./parsed.json', JSON.stringify(parsed, null, 2), (err) => console.log('err', err))
})
// p.results --> [ ["sum", "1", "1"] ]
