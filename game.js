const composeMiddleware = (middleware) =>
  middleware.length > 0 ? middleware.reverse().reduce((acc, fn) => (...args) => fn(acc(...args)))((event, state) => state) : (event, state) => state

export default (program, middleware) => {
  const processEvent = composeMiddleware(middleware)
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