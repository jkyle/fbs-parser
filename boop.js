import game from './game.js';
const runner = game();
runner.dispatch('ARENA', 'LOOK')
runner.subscribe(state => console.log(state))
runner.dispatch('SWORD', 'TAKE')
runner.dispatch('ARENA', 'LOOK')
