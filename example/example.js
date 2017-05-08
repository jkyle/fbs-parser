const { createGame, processor, defaultMiddleware } = require('../dist');

const initialState = require('./build/state.json')
const program = require('./build/program.json')

const fbs = processor(program);

const game = createGame(
  Object.assign({}, initialState, {location: 'ARENA', buffer: ['Welcome to the game.']}),
  [...defaultMiddleware, fbs]
);

game.dispatch({type: 'START'})
game.subscribe(state => {console.log(state.location, state.buffer)})
game.dispatch('look')
game.dispatch('take sword')
game.dispatch('go to the armory')
game.dispatch('take sword')
game.dispatch('look at the sword')
