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
console.log(props('ARENA', 'backgroundColor', game.getState()))
game.subscribe(state => {console.log(state.buffer.join('\n'))})
game.dispatch('look')
console.log(game.getState().objects.SWORD)
game.dispatch('take sword')
console.log(props('ARENA', 'textColor', game.getState()))
game.dispatch('look sword')
game.dispatch('use sword on arena')
game.dispatch('go armory')
game.dispatch('look at sword')