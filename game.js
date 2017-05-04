import processor from './processors/file';
import initialState from './game-state.json';
import program from './game-program.json';

const app = Object.keys(program).reduce((acc, key) =>
  ({...acc, [key]: processor(program[key]) }), {})

const performAction = (target, action, state) => {
  try {
    // First, see if this action is defined for this target.
    const newState = app[target][action](state, target)
    // If state doesn't change as a result of the action, inform the player.
    if(newState === state) {
        return {...state, buffer: ["Nothing happens.", ...state.buffer] }
    }
    return newState
  } catch(e) {
    try {
      // If the action isn't define for that object, check to see
      // if there's a default action defined.
      return app.DEFAULT[action](state, target)
    } catch(e) {
      // Finally, that action has no in-game function, inform the player.
      return {...state, buffer: ["Not understood.", ...state.buffer] }
    }
  }
}

export default () => {
  let state = Object.keys(app).reduce((acc, key) => app[key].START ? app[key].START(acc, key) : acc, initialState)
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