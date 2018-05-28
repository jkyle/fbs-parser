#!/usr/bin/env node

import commander from 'commander'
import _fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import processFBS from './fbs';

const fs = Promise.promisifyAll(_fs);
const dir = process.cwd();
commander.version('0.0.1')
       .option('-i, --input [dir]', 'Input directory')
       .option('-o, --output [dir]', 'Output directory')
       .parse(process.argv)


const writeFiles = (state, program) => Promise.all([
  fs.writeFileAsync(path.resolve(`${dir}/${(program.output || 'build')}/state.json`), JSON.stringify(state)),
  fs.writeFileAsync(path.resolve(`${dir}/${(program.output || 'build')}/program.json`), JSON.stringify(program))
])

processFBS(path.resolve(`${dir}/${(program.input || 'game-objects')}`))
  .then(({state, program}) => writeFiles(state, program));