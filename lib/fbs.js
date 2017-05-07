#!/usr/bin/env node

import program from 'commander'
import _fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import nearley from 'nearley'
import grammar from './fbs-grammar.js'

const fs = Promise.promisifyAll(_fs);
const dir = process.cwd();
program.version('0.0.1')
       .option('-i, --input [dir]', 'Input directory')
       .option('-o, --output [dir]', 'Output directory')
       .parse(process.argv)

const readDir = (dir) =>
  fs.readdirAsync(dir)
    .then((items) => Promise.all(items.map(item => {
        const file = path.resolve(dir, item)
        return fs.statAsync(file).then(stat =>
          stat && stat.isDirectory() ? readDir(file) : { item, file}
        )
    }))
  );

const flatten = arr =>
  arr.reduce((acc, item) => (Array.isArray(item) ? [...acc, ...flatten(item)] : [...acc, item]), [])

const parseFile = file => console.log(file) || fs.readFileAsync(file, 'utf8')
                            .then(result => {
                              var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
                              p.feed(result)
                              return p.results[0][0]
                            })
                            .catch(e => console.log('eer', e));

const parseFiles = files =>
  Promise.all(files.map(({ file }) => parseFile(file)))

const buildState = definition => {
  const global = definition.find(item => item.type === 'GLOBAL')
  const state = ({ location: undefined, buffer: [] })

  const stateObjects = definition.filter(item => item.type !== 'GLOBAL').reduce((acc, item) => ({...acc, [item.id]: {id: item.id, type: item.type, properties: {}, items: [], exits: []} }), {})
  const program = definition.reduce((acc, item) => ({...acc, [item.id]: item.events }), {})

  state.objects = stateObjects;

  return { state, program }
}

const writeFiles = (state, program) => Promise.all([
  fs.writeFileAsync(path.resolve(`${dir}/${(program.output || 'build')}/state.json`), JSON.stringify(state)),
  fs.writeFileAsync(path.resolve(`${dir}/${(program.output || 'build')}/program.json`), JSON.stringify(program))
])

readDir(path.resolve(`${dir}/${(program.input || 'game-objects')}`))
  .then(flatten)
  .then(parseFiles)
  .then(buildState)
  .then(({state, program}) => writeFiles(state, program));