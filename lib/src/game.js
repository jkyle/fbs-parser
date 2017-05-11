import inputParser from './input-parser'
import createSelector from './selectors'

const selectors = {
  $LOCATION: ['$OBJECTS', ['$GLOBAL', 'location']],
  $OBJECTS: ['objects'],
  $GLOBAL: [],
  $BUFFER: ['buffer'],
  $PLAYER: ['PLAYER'],
  $INVENTORY: ['$PLAYER', 'items']
}

const select = createSelector(selectors)

const noop = (event, state) => state

const composeMiddleware = (middleware = []) =>
  middleware.length > 0 ? middleware.reverse().reduce((acc, fn) => (...args) => fn(acc(...args), select))(noop) : noop

export default (initialState, middleware) => {
  const processEvent = composeMiddleware(middleware)
  const subscribers = []
  let state = initialState;

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (input) => {
      const action = typeof input === 'string' ? inputParser(input) : input
      state = processEvent(action, state)
      subscribers.forEach(cb => cb(state))
    },
    getState: () => ({ ...state })
  }
}