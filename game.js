import processor from './processors/file';

const initProgram = program => {
  const exe = Object.keys(program).reduce((acc, key) => ({...acc, [key]: processor(program[key]) }), {})
  return (event, state, cb) => {
    const legitEvent = exe[event.subject] && exe[event.subject][event.type];
    return legitEvent && cb ? cb(legitEvent(state, event.subject, event.target)) :
           legitEvent       ? legitEvent(state, event.subject, event.target)     :
           cb               ? cb(state)                                          :
                              state
  }
}

const composeMiddleware = (middleware, done) =>
  middleware.length > 0 ? middleware.reverse().reduce((acc, fn) => (...args) => fn(acc(...args)))(done) : done

export default (program, initialState, middleware) => {
  const defaultEvent = initProgram(program)
  const processEvent = composeMiddleware(middleware, defaultEvent)

  const subscribers = []
  const next = (newState) => subscribers.forEach(cb => cb(newState))
  let state;

  const performAction = (event, state) => {
    try { // First, see if this event is defined for this target.
      return processEvent(event, state);
    } catch(e) {
        // Finally, if event has no in-game function, inform the player.
        console.log(e);
        return {...state, buffer: ["Not understood.", ...state.buffer] }
    }
  }

  return {
    start: (gameState) => {
      state = Object.keys(program).reduce((acc, key) => defaultEvent({ subject: key, type: 'START'}, acc), {...initialState, ...gameState})
    },
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (subject, type, target) => {
      state = processEvent({ subject, type, target}, state)
      next(state)
    }
  }
}