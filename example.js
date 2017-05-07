import createGame from './game'
import middleware from './middleware'
import processor from './processor'

import initialState from './build/state.json'
import program from './build/program.json'

const fbs = processor(program);

const game = createGame(
  {...initialState, location: 'ARENA', buffer: ['Welcome to the game.']},
  [...middleware, fbs]
);

game.dispatch({type: 'START'})
game.subscribe(state => {console.log(state.location, state.buffer)})
game.dispatch({type: 'LOOK'})
game.dispatch({subject: 'SWORD', type: 'TAKE'})
game.dispatch({subject: 'ARMORY', type: 'GO'})
game.dispatch({subject: 'SWORD', type: 'TAKE'})
game.dispatch({subject: 'SWORD', type: 'LOOK'})
