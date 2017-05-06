import createGame from './game.js';
import initialState from './game-state.json'
import program from './game-program.json'
import look from './middleware/look'
import take from './middleware/take'
import go from './middleware/go'
import nothing from './middleware/nothing-happens'
import clear from './middleware/clear-buffer'


const game = createGame(program, initialState, [clear, nothing, look, go, take]);
// game.dispatch('ARENA', 'LOOK')
game.start({location: 'ARENA', buffer: ['Welcome to the game.']});
game.subscribe(state => {console.log(state.location, state.buffer)})
// game.dispatch('ARMORY', 'GO')
game.dispatch('SWORD', 'TAKE')
game.dispatch('ARMORY', 'GO')
game.dispatch('SWORD', 'TAKE')
game.dispatch('SWORD', 'BUTT')
