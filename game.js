import processor from './processors/file';

const initProgram = program => {
  const app = Object.keys(program).reduce((acc, key) => ({...acc, [key]: processor(program[key]) }), {})

  return (action, state) =>
    app[action.subject] && app[action.subject][action.type] ? app[action.subject][action.type](state, action.subject, action.target) : state
}


export default (program, initialState, middleware) => {
  const app = initProgram(program)
  let state = Object.keys(program).reduce((acc, key) => app({ subject: key, type: 'START'}, acc), {...initialState, location: 'ARMORY'})

  const subscribers = []
  const next = (newState) => subscribers.forEach(cb => cb(newState))

  const eventRunners = function(action, state){
    //  middleware.map(fn => fn(app))
    //  console.log(action.type, 'state', (state.location ? 'ok' : 'nooope'));
     const actions = middleware.map(fn => fn(app));
    //  return actions.reduce((a, b) => (...args) => a(b(...args)))

     const go = actions.reverse().reduce((acc, fn) => (...args) => fn(acc(...args)))
     return go(app)(action, state)
   }

  const performAction = (action, state) => {
    try { // First, see if this action is defined for this target.
      const newState = eventRunners(action, state);
      // If state doesn't change as a result of the action, inform the player.
      return newState === state ? {...state, buffer: ["Nothing happens.", ...state.buffer] } : newState
    } catch(e) {
        // Finally, that action has no in-game function, inform the player.
        console.log(e);
        return {...state, buffer: ["Not understood.", ...state.buffer] }
    }
  }

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (subject, type, target) => {
      state = performAction({ subject, type, target}, state)
      next(state)
    }
  }
}