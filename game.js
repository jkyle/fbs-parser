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

export default (program, middleware) => {
  const defaultEvent = initProgram(program)
  const processEvent = composeMiddleware(middleware, defaultEvent)

  const subscribers = []
  let state;

  return {
    start: (gameState) => {
      state = processEvent({ type: 'START'}, gameState)
      // state = Object.keys(program).reduce((acc, key) => processEvent({ subject: key, type: 'START'}, acc), gameState)
    },
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (subject, type, target) => {
      state = processEvent({ subject, type, target}, state)
      subscribers.forEach(cb => cb(state))
    }
  }
}