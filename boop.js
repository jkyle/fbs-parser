import createGame from './game.js';
import initialState from './game-state.json'
import program from './game-program.json'
import look from './middleware/look'
import take from './middleware/take'
import go from './middleware/go'
import nothing from './middleware/nothing-happens'
import clear from './middleware/clear-buffer'
import start from './middleware/start';


const game = createGame(program, [clear, start, nothing, look, go, take]);

game.start({...initialState, location: 'ARENA', buffer: ['Welcome to the game.']});
game.subscribe(state => {console.log(state.location, state.buffer)})
game.dispatch('ARMORY', 'GO')
game.dispatch('SWORD', 'TAKE')
game.dispatch('ARENA', 'GO')
game.dispatch('SWORD', 'TAKE')
game.dispatch('SWORD', 'LOOK')
