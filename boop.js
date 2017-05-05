import game from './game.js';
import initialState from './game-state.json';
import program from './game-program.json';
import GO from './events/go';
import LOOK from './events/look'
import TAKE from './events/take'


const runner = game(program, initialState, [GO, LOOK, TAKE]);
// runner.dispatch('ARENA', 'LOOK')
runner.subscribe(state => console.log(state.location, state.buffer))
runner.dispatch('SWORD', 'TAKE')
runner.dispatch('ARMORY', 'GO')
runner.dispatch('SWORD', 'LOOK')
