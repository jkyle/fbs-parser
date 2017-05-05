import _fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
var grammar = require("./file.js");
var nearley = require("nearley");

const fs = Promise.promisifyAll(_fs);
var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

const readDir = (dir) =>
  fs.readdirAsync(dir)
    .then((items) => {
      return Promise.all(items.map(item => {
        const file = path.resolve(dir, item)
        return fs.statAsync(file).then((stat) => {
          if(stat && stat.isDirectory()){
            return readDir(file)
          } else {
            return ({ item, file})
          }
        })
    }))
  }
  );

const flatten = arr =>
  arr.reduce((acc, item) => (Array.isArray(item) ? [...acc, ...flatten(item)] : [...acc, item]), [])

const nameToId = name => {
  const [first, ext] = name.split('.')
  const all = first.split('-')
  return flatten(all).map(i => i.toUpperCase()).join(' ')
}


const parseFile = file => fs.readFileAsync(file, 'utf8')
                            .then(result => {
                              console.log(result);
                              p.feed(result)
                              return p.results[0]
                            })

const parseFiles = files =>
  Promise.all(files.map(({ file }) => parseFile(file)))

const buildState = definition => {
  const global = definition.find(item => item.type === 'GLOBAL')
  const state = ({ location: undefined, buffer: [] })
  // const program = global ? ({ GAME: global.events }) : {}

  const stateObjects = definition.filter(item => item.type !== 'GLOBAL').reduce((acc, item) => ({...acc, [item.id]: {id: item.id, type: item.type, properties: {}, items: [], exits: []} }), {})
  const program = definition.reduce((acc, item) => ({...acc, [item.id]: item.events }), {})

  state.objects = stateObjects;
  // program.objects = programObjects;

  return { state, program }
}

const writeFiles = (state, program) => Promise.all([
  fs.writeFileAsync('./game-state.json', JSON.stringify(state, null, 2)),
  fs.writeFileAsync('./game-program.json', JSON.stringify(program, null, 2))
])

readDir(__dirname + '/game-objects')
  .then(ugh => flatten(ugh))
  .then(parseFiles)
  .then(result => result[result.length-1])
  .then(buildState)
  .then(({state, program}) => writeFiles(state, program));