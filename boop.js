import game from './game.js';
import initialState from './game-state.json';
import program from './game-program.json';
import IN_LOCATION from './events/in-location';
import TAKE from './events/take'


const runner = game(program, initialState, [IN_LOCATION, TAKE]);
// runner.dispatch('ARENA', 'LOOK')
runner.subscribe(state => console.log(state.location, state.buffer[0]))
// runner.dispatch('ARMORY', 'GO')
runner.dispatch('SWORD', 'TAKE')
runner.dispatch('ARENA', 'GO')
runner.dispatch('ARENA', 'GO')
runner.dispatch('SWORD', 'TAKE')
runner.dispatch('SWORD', 'LOOK')
