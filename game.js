import processor from './processors/file';
import initialState from './game-state.json';
import program from './game-program.json';

const app = Object.keys(program).reduce((acc, key) =>
  ({...acc, [key]: processor(program[key]) }), {})

// const actions = [game.objects.SWORD.START, game.objects.SWORD.TAKE, game.objects.SWORD.LOOK]
// const t1 = process.hrtime();
// const result = actions.reduce((acc, fn) => fn(acc), game)

const performAction = (target, action, state) => app[target][action](state)


export default () => {
  let state = Object.keys(app).reduce((acc, key) => app[key].START ? app[key].START(acc) : acc, initialState)
  const subscribers = []

  const next = newState => subscribers.forEach(cb => cb(newState))

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (target, action) => {
      state = performAction(target, action, state)
      next(state)
    }
  }
}