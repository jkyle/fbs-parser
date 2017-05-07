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
game.dispatch({type: 'LOOK'})
game.dispatch({subject: 'SWORD', type: 'TAKE'})
game.dispatch({subject: 'ARMORY', type: 'GO'})
game.dispatch({subject: 'SWORD', type: 'TAKE'})
game.dispatch({subject: 'SWORD', type: 'LOOK'})
