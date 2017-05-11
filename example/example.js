// const { createGame, processor, defaultMiddleware } = require('../dist');
const { createGame, processor, defaultMiddleware } = require('../lib/src');

const initialState = require('./build/state.json')
const program = require('./build/program.json')

const {middleware, props} = processor(program);

const game = createGame(
  Object.assign({}, initialState, {location: 'ARENA', buffer: ['Welcome to the game.']}),
  [...defaultMiddleware, middleware]
);
game.dispatch('start')
game.subscribe(state => {console.log(state.buffer.join('\n'))})
game.dispatch('look')
game.dispatch('take sword')
game.dispatch('look sword')
game.dispatch('use sword on arena')
game.dispatch('go armory')
game.dispatch('look at sword')