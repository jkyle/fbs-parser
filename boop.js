import processor from './processors/file';
import initialState from './game-state.json';
import program from './game-program.json';

const app = Object.keys(program).reduce((acc, key) =>
  ({...acc, [key]: processor(program[key]) }), {})

// const actions = [game.objects.SWORD.START, game.objects.SWORD.TAKE, game.objects.SWORD.LOOK]
// const t1 = process.hrtime();
// const result = actions.reduce((acc, fn) => fn(acc), game)
// const t2 = process.hrtime(t1);
const run = runner => (target, action) =>
  runner[target][action](initialState)


console.log(run(app)('ARENA', 'LOOK').buffer[0]);