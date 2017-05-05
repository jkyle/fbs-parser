import processor from './processors/file';

const initProgram = program => {
  const app = Object.keys(program).reduce((acc, key) => ({...acc, [key]: processor(program[key]) }), {})

  return (action, state) =>
    app[action.subject] && app[action.subject][action.type] ? app[action.subject][action.type](state, action.subject, action.target) : state
}


export default (program, initialState, middleware) => {
  const app = initProgram(program)
  let state = Object.keys(program).reduce((acc, key) => app({ subject: key, type: 'START'}, acc), {...initialState, location: 'ARENA'})
  const eventRunners = middleware.map(fn => fn(app));

  const performAction = (action, state) => {
    try { // First, see if this action is defined for this target.
      const newState = eventRunners.reduce((acc, fn) => fn(action, acc), state);
      // If state doesn't change as a result of the action, inform the player.
      return newState === state ? {...state, buffer: ["Nothing happens.", ...state.buffer] } : newState
    } catch(e) {
        // Finally, that action has no in-game function, inform the player.
        console.log(e);
        return {...state, buffer: ["Not understood.", ...state.buffer] }
    }
  }



  const subscribers = []

  const next = newState => subscribers.forEach(cb => cb(newState))

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (subject, type, target) => {
      state = performAction({ subject, type, target}, state)
      next(state)
    }
  }
}