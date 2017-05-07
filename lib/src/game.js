const noop = (event, state) => state

const composeMiddleware = (middleware = []) =>
  middleware.length > 0 ? middleware.reverse().reduce((acc, fn) => (...args) => fn(acc(...args)))(noop) : noop

export default (initialState, middleware) => {
  const processEvent = composeMiddleware(middleware)
  const subscribers = []
  let state = initialState;

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (action) => {
      state = processEvent(action, state)
      subscribers.forEach(cb => cb(state))
    }
  }
}