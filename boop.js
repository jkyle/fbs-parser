import game from './game.js';
const runner = game();
// runner.dispatch('ARENA', 'LOOK')
runner.subscribe(state => console.log(state.location, state.buffer))
runner.dispatch('ARMORY', 'GO')
// runner.dispatch('ARENA', 'BUTT')
