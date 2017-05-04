import game from './game.js';
const runner = game();
// runner.dispatch('ARENA', 'LOOK')
runner.subscribe(state => console.log(state.buffer[0]))
runner.dispatch('SWORD', 'TAKE')
// runner.dispatch('ARENA', 'TAKE')
// runner.dispatch('ARENA', 'BUTT')
