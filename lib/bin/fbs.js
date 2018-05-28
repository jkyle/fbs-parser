#!/usr/bin/env node

import program from 'commander'
import _fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import nearley from 'nearley'
import grammar from './fbs-grammar.js'

const fs = Promise.promisifyAll(_fs);

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
  const program = definition.reduce((acc, item) => (
    {...acc,
      [item.id]: { events: item.events, props: item.props }
    }), {})

  state.objects = stateObjects;

  return { state, program }
}

export const processFBS = (dir) => readDir(dir).then(flatten)
  .then(parseFiles)
  .then(buildState);
